
var assert = require('assert')
var app = require('../lib/server')
var request = require('supertest')
var server = null
var chalk = require('chalk')
var version = require('../package').version

var log = {
  default: str => console.log(chalk.dim.magenta(str)),
  warning: str => console.log(chalk.dim.red(str))
}

describe('webpage', () => {
  describe('GET /', () => {
    it('should display default page', done => {
      request(app)
      .get('/')
      .expect(200, done)
    })
  })

  describe('GET /version', () => {
    it('should display webpage verison', done => {
      request(app)
      .get('/version')
      .expect(200, { version: version }, done)
    })
  })
})
