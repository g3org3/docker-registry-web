'use strict'
require('dotenv').config();

var express = require('express')
var app = express()
var version = require('../package').version
var axios = require('axios')

const SECRET = process.env.SECRET

if (!SECRET) {
  console.log('SECRET was not provided!')
  process.exit(1)
}

app.get('/image/:image', function (req, res) {
  const image = req.params.image
  axios({
    url: `https://registry.jorgeadolfo.com/v2/${image}/tags/list`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${SECRET}`
    }
  })
  .then(response => {
    const tags = response.data.tags
    let html = `<head>
      <title>Docker Registry</title>
      <link rel='stylesheet' href='//bootswatch.com/paper/bootstrap.min.css' />
    </head>
    <div class='navbar navbar-inverse navbar-static-top'>
      <div class='container'>
        <a class='navbar-brand' href='/'>Registry</a>
      </div>
    </div>
    <div class='container'>
    <h2>${image}</h2>
    <hr />
    <table class='table table-striped'><thead><tr><th>Tags</th></tr></thead><tbody>`
    tags.map(tag => {
      html += `<tr><td>${tag}</td></tr>`
    })
    html += '</tbody></table></div>'
    res.send(html)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })

})

app.get('/', function (req, res) {
  axios({
    url: 'https://registry.jorgeadolfo.com/v2/_catalog',
    method: 'GET',
    headers: {
      'Authorization': `Basic ${process.env.SECRET}`
    }
  })
  .then(response => {
    const repos = response.data.repositories
    let html = `<head>
      <title>Docker Registry</title>
      <link rel='stylesheet' href='//bootswatch.com/paper/bootstrap.min.css' />
    </head>
    <div class='navbar navbar-inverse navbar-static-top'>
      <div class='container'>
        <a class='navbar-brand' href='#'>Registry</a>
      </div>
    </div>
    <div class='container'>
    <h2>Images</h2>
    <hr />
    <table class='table table-striped'><thead><tr><th>Name</th></tr></thead><tbody>`
    repos.map(repo => {
      html += `<tr><td><a href='/image/${repo}'>${repo}</a></td></tr>`
    })
    html += '</tbody></table></div>'
    res.send(html)
  })
  .catch(err => {
    console.error(err)
    res.send(err)
  })

})

app.get('/version', (req, res) => {
  res.send({ version: version })
})

module.exports = app
