'use strict'
require('dotenv').config({ silent: true })

var express = require('express')
var app = express()
var version = require('../package').version
var axios = require('axios')
var registry = process.env.REGISTRY || 'https://registry.jorgeadolfo.com'

app.set('view engine', 'pug')

const SECRET = process.env.SECRET

// Declare internals
var internals = {}

internals.registryApi = (endpoint, cb) => {
  axios({
    url: `${registry}/v2/${endpoint}`,
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

if (!SECRET) {
  console.log('SECRET was not provided!!')
  process.exit(1)
}

app.get('/image/:image', function (req, res) {
  const image = req.params.image
  axios({
    url: `https://registry.jorgeadolfo.com/v2/${image}/tags/list`,
    method: 'GET',
    headers: { 'Authorization': `Basic ${SECRET}` }
  })
  .then(response => {
    const tags = response.data.tags
    res.render('image', { image: image, tags: tags })
  })
  .catch(err => {
    console.error(err.message)
    res.render('error', { err: err })
  })
})

app.get('/', function (req, res) {
  axios({
    url: 'https://registry.jorgeadolfo.com/v2/_catalog',
    method: 'GET',
    headers: { 'Authorization': `Basic ${SECRET}` }
  })
  .then(response => {
    const repos = response.data.repositories
    res.render('index', { images: repos })
  })
  .catch(err => {
    console.error(err.message)
    res.render('error', { err: err })
  })
})

app.get('/version', (req, res) => {
  res.send({ version: version })
})

module.exports = app
