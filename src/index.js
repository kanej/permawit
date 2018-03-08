'use strict'

const Merkling = require('merkling')
const fs = require('fs')
const os = require('os')
const path = require('path')
const {promisify} = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

class Feed {
  constructor ({ name, permawit }) {
    this.name = name
    this.permawit = permawit
  }

  async post ({ text }) {
    return this.permawit.post({ feed: this.name, text })
  }

  [Symbol.asyncIterator] () {
    return this.feedAsyncIterator()
  }

  feedAsyncIterator () {
    const feedHash = this.permawit.store.getFeedSync(this.name)
    let started = false
    let nextEntry = null
    let permawit = this.permawit
    const iterateEntry = (post) => {
      nextEntry = post.next

      return {
        done: false,
        value: post.text
      }
    }
    return {
      next () {
        if (!started) {
          started = true
          return permawit.merkling.get(feedHash).then((head) => {
            if (!head.entries) {
              return { done: true }
            }

            return permawit.merkling.resolve(head.entries)
          }).then(iterateEntry)
        } else {
          if (!nextEntry) {
            return { done: true }
          }

          return permawit.merkling.resolve(nextEntry).then(iterateEntry)
        }
      },
      return () {
        return {}
      },
      [Symbol.asyncIterator] () {
        return this
      }
    }
  }
}

class PermawitFilestore {
  constructor ({ root }) {
    this.rootDir = path.join(os.homedir(), '.permawit')
    this.storeFile = path.join(this.rootDir, 'store.json')
  }

  async init () {
    if (!fs.existsSync(this.rootDir)) {
      fs.mkdirSync(this.rootDir)
    }

    if (!fs.existsSync(this.storeFile)) {
      const json = JSON.stringify({
        version: 1,
        feeds: {}
      })
      await writeFile(this.storeFile, json, 'utf8')
    }
  }

  async setFeed (name, ipfsHash) {
    var config = JSON.parse(await readFile(this.storeFile))
    config.feeds[name] = ipfsHash
    await writeFile(this.storeFile, JSON.stringify(config), 'utf8')
  }

  async getFeed (name) {
    var config = JSON.parse(await readFile(this.storeFile))
    return config.feeds[name]
  }

  getFeedSync (name) {
    var config = JSON.parse(fs.readFileSync(this.storeFile))
    return config.feeds[name]
  }
}

class Permawit {
  constructor ({ ipfs, store }) {
    if (ipfs === undefined) {
      throw Error('ipfs must be passed as an option')
    }

    this.store = store

    this.merkling = new Merkling({ipfs: ipfs})
    this.feeds = []
  }

  async createFeed ({ name }) {
    const feedHead = await this.merkling.save({
      name: name,
      entries: null
    })

    this.store.setFeed(name, feedHead._cid.toBaseEncodedString())

    return new Feed({ name, permawit: this })
  }

  async post ({ feed, text }) {
    const feedHeadHash = await this.store.getFeed(feed)
    console.log(feedHeadHash)
    const feedHead = await this.merkling.get(feedHeadHash)

    const previousEntry = feedHead.entries

    feedHead.entries = await this.merkling.create({
      text: text,
      next: previousEntry
    })

    await this.merkling.save(feedHead)

    this.store.setFeed(feed, feedHead._cid.toBaseEncodedString())

    // this.feeds[feed] = feedHead._cid.toBaseEncodedString()
  }

  async posts (feed, callback) {
    const feedHeadHash = await this.store.getFeed(feed)
    const feedHead = await this.merkling.get(feedHeadHash) // this.merkling.get(this.feeds[feed])

    let currentEntry = feedHead.entries

    while (currentEntry !== null) {
      await this.merkling.resolve(currentEntry)
      callback(currentEntry.text)
      currentEntry = currentEntry.next
    }
  }
}

Permawit.Filestore = PermawitFilestore

module.exports = Permawit
