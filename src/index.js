'use strict'

const Merkling = require('merkling')

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
    const feedHash = this.permawit.feeds[this.name]
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
        // Release the lock if the iterator terminates.
        return {}
      },
      // for-await calls this on whatever it's passed, so
      // iterators tend to return themselves.
      [Symbol.asyncIterator] () {
        return this
      }
    }
  }
}

class Permawit {
  constructor ({ ipfs }) {
    if (ipfs === undefined) {
      throw Error('ipfs must be passed as an option')
    }

    this.merkling = new Merkling({ipfs: ipfs})
    this.feeds = []
  }

  async createFeed ({ name }) {
    const feedHead = await this.merkling.save({
      name: name,
      entries: null
    })

    this.feeds[name] = feedHead._cid.toBaseEncodedString()

    return new Feed({ name, permawit: this })
  }

  async post ({ feed, text }) {
    const feedHead = await this.merkling.get(this.feeds[feed])

    const previousEntry = feedHead.entries

    feedHead.entries = await this.merkling.create({
      text: text,
      next: previousEntry
    })

    await this.merkling.save(feedHead)

    this.feeds[feed] = feedHead._cid.toBaseEncodedString()
  }

  async posts (feed, callback) {
    const feedHead = await this.merkling.get(this.feeds[feed])

    console.log(feedHead)
    let currentEntry = feedHead.entries

    while (currentEntry !== null) {
      await this.merkling.resolve(currentEntry)
      callback(currentEntry.text)
      currentEntry = currentEntry.next
    }
  }
}

module.exports = Permawit
