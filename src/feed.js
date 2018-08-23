'use strict'

class Feed {
  constructor ({ name, permawit }) {
    this.name = name
    this.permawit = permawit
  }

  async post ({ text }) {
    return this.permawit.post({ feed: this.name, text })
  }

  getHash () {
    return this.permawit.store.getFeedSync(this.name)
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

module.exports = Feed
