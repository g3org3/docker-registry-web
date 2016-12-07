'use strict'
require('dotenv').config({ silent: true })

// Dependencies
const Version = require('../package').version
const RAPI = require('../helper/registryApi')
const Express = require('express')
const App = Express()

// Render views with Pug
App.set('view engine', 'pug')

// Handlers
App.get('/image/:image', function (req, res) {
  const image = req.params.image
  RAPI.tags(image, (err, response) => {
    if (err) {
      console.error('[ERROR]', err.message)
      return res.render('error', { err: err })
    }
    const tags = response.tags
    return res.render('image', { image: image, tags: tags })
  })
})

App.get('/', function (req, res) {
  RAPI.images({}, (err, response) => {
    if (err) {
      console.error('[ERROR]', err.message)
      return res.render('error', { err: err })
    }
    const repositories = response.repositories
    return res.render('index', { images: repositories })
  })
})

App.get('/version', (req, res) => {
  res.send({ version: Version })
})

module.exports = App
