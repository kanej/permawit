'use strict'

const IPFS = require('ipfs')

const setupNode = (config) => {
  return new Promise((resolve, reject) => {
    const node = new IPFS(config)

    node.on('ready', () => {
      resolve(node)
    })
  })
}

const shutdownNode = (node) => {
  return new Promise((resolve, reject) => {
    node.stop((err) => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}

const withIpfs = (config, callback) => {
  var withIpfsNode
  return setupNode(config).then(node => {
    withIpfsNode = node
    return callback(node)
  }).then(() => {
    return shutdownNode(withIpfsNode)
  })
}

module.exports = {
  setupNode: setupNode,
  shutdownNode: shutdownNode,
  withIpfs: withIpfs
}
