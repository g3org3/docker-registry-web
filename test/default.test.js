/* global describe it */
var app = require('../lib/server')
var request = require('supertest')
var version = require('../package').version

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
