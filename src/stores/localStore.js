'use strict'

class LocalStore {
  constructor ({ localStorageKey, localStorage } = {}) {
    this.localStorageKey = localStorageKey || 'permawit'
    this.localStorage = localStorage || window.localStorage
  }

  async init () {
    if (!this.localStorage.hasOwnProperty(this.localStorageKey)) {
      this.localStorage[this.localStorageKey] = JSON.stringify({
        version: 1,
        feeds: {}
      })
    }
  }

  async setFeed (name, ipfsHash) {
    this._applyLocalStorageChange((config) => {
      config.feeds[name] = ipfsHash
      return config
    })
  }

  async getFeed (name) {
    return this.getFeedSync(name)
  }

  getFeedSync (name) {
    var config = this._readConfig()
    return config.feeds[name]
  }

  _readConfig () {
    return JSON.parse(this.localStorage[this.localStorageKey])
  }

  _applyLocalStorageChange (actionFn) {
    var config = this._readConfig()
    var updated = actionFn(config)
    this.localStorage[this.localStorageKey] = JSON.stringify(updated)
  }
}

module.exports = LocalStore
