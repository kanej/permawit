'use strict'

const Merkling = require('merkling')

const Feed = require('./feed')
const LocalStore = require('./stores/localStore')

class Permawit {
  constructor ({ ipfs, store } = {}) {
    if (ipfs === undefined) {
      if (window && window.ipfs) {
        ipfs = window.ipfs
      } else {
        throw Error('ipfs must be passed as an option')
      }
    }

    this.ipfs = ipfs

    this.store = store || new LocalStore()

    this.merkling = new Merkling({ ipfs })
    this.feeds = []
  }

  async init () {
    await this.store.init()
  }

  async createFeed ({ name, author }) {
    const feedHead = await this.merkling.save({
      name: name,
      author: author,
      entries: null
    })

    this.store.setFeed(name, feedHead._cid.toBaseEncodedString())

    return new Feed({ name, permawit: this })
  }

  async loadFeed ({ cid }) {
    const feedHead = await this.merkling.get(cid)

    this.store.setFeed(feedHead.name, feedHead._cid.toBaseEncodedString())

    return new Feed({ name: feedHead.name, permawit: this })
  }

  async getFeed (feedName) {
    const feedHeadHash = await this.store.getFeed(feedName)

    if (!feedHeadHash) {
      return null
    }

    return new Feed({ name: feedName, permawit: this })
  }

  async post ({ feed, text }) {
    const feedHeadHash = await this.store.getFeed(feed)
    const feedHead = await this.merkling.get(feedHeadHash)

    const previousEntry = feedHead.entries

    feedHead.entries = await this.merkling.create({
      text: text,
      next: previousEntry
    })

    await this.merkling.save(feedHead)

    const updatedCid = feedHead._cid.toBaseEncodedString()
    this.store.setFeed(feed, updatedCid)

    return updatedCid
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

module.exports = Permawit
