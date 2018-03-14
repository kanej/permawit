'use strict'

const path = require('path')
const yargs = require('yargs')

const Permawit = require('../src/index')
// const IPFS = require('ipfs')

const { withIpfs } = require('../src/ipfsHelpers')

const withWit = async (callback) => {
  const store = new Permawit.Filestore({
    root: '~/.permawit'
  })

  const config = {
    repo: path.join(store.rootDir, 'ipfs'),
    config: {
      Addresses: {
        Swarm: []
      }
    }
  }

  await store.init()

  await new Promise((resolve, reject) => {
    withIpfs(config, async ipfs => {
      const wit = new Permawit({
        ipfs: ipfs,
        store: store
      })

      await callback(wit)

      resolve()
    })
  })
}

/* eslint-disable no-unused-expressions */
yargs
  .command({
    command: 'init <feed>',
    desc: 'create a named feed',
    builder: (yargs) => yargs.positional('feed', {
      describe: 'name of the feed to create',
      demandOption: true
    }),
    handler: async (argv) => {
      console.log(`Creating feed ${argv.feed}`)

      await withWit(async (wit) => {
        await wit.createFeed({ name: argv.feed })
      })
    }
  })
  .command({
    command: 'post',
    desc: 'post a message to a feed',
    builder: (yargs) => yargs
      .option('feed', {
        describe: 'name of the feed to create',
        demandOption: true
      })
      .option('message', {
        describe: 'message to post to your feed',
        demandOption: true
      }),
    handler: async (argv) => {
      console.log(`Posting message to feed ${argv.feed}`)
      console.log(argv.message)

      await withWit(async (wit) => {
        await wit.post({ feed: argv.feed, text: argv.message })
      })
    }
  })
  .command({
    command: 'show [feed]',
    desc: 'show a feed',
    builder: (yargs) => yargs
      .option('feed', {
        describe: 'name of the feed to create',
        demandOption: true
      }),
    handler: async (argv) => {
      console.log(`Reading feed ${argv.feed}`)

      await withWit(async (wit) => {
        await wit.posts(argv.feed, post => {
          console.log(post)
        })
      })
    }
  })
  .help()
  .argv
