'use strict'

// Dependencies
const Axios = require('axios')

// Conf Vars
const SECRET = process.env.SECRET
const REGISTRY = process.env.REGISTRY

// Check if conf vars are set
if (!SECRET || !REGISTRY) {
  console.log('SECRET and/or REGISTRY was not provided!!')
  process.exit(1)
}

function http (endpoint, cb) {
  Axios({
    url: `${REGISTRY}/v2/${endpoint}`,
    method: 'GET',
    headers: { 'Authorization': `Basic ${SECRET}` }
  })
  .then(response => {
    return typeof cb === 'function' && cb(null, response.data)
  })
  .catch(err => {
    return typeof cb === 'function' && cb(err)
  })
}

function getTags (image, cb) {
  const empty = { tags: [] }
  if (typeof image === 'function') {
    return image(null, empty)
  } else if (!image) {
    return cb(null, empty)
  }
  return http(`${image}/tags/list`, (err, res) => {
    if (err && err.response && err.response.status === 404) {
      return cb(null, empty)
    }
    return cb(err, res)
  })
}

function getImages (conf, cb) {
  http(`_catalog`, cb)
}

module.exports = {
  tags: getTags,
  images: getImages
}
