'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const {promisify} = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

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

module.exports = PermawitFilestore
