/* global describe it */
const app = require('../lib/server')
const request = require('supertest')
const version = require('../package').version
const RAPI = require('../helper/registryApi')

// Declare Internals
const Internals = {
  images: []
}

describe('RegistryApi', () => {
  describe('#images()', () => {
    it('should get all available images', done => {
      RAPI.images({}, (err, res) => {
        if (err) {
          return done(err)
        }
        Internals.images = res.repositories
        done(null, res)
      })
    })
  })

  describe(`#tags(:image)`, () => {
    it('should get all tags for giving image', done => {
      RAPI.tags(Internals.images[0], done)
    })

    it('should return empty array', done => {
      RAPI.tags('not-found-image', done)
    })

    it('should return empty array', done => {
      RAPI.tags(done)
    })
  })
})

describe('webpage', () => {
  describe('GET /', () => {
    it('should display default page', done => {
      request(app)
      .get('/')
      .expect(200, done)
    })
  })

  describe(`GET /version ${version}`, () => {
    it('should display webpage version', done => {
      request(app)
      .get('/version')
      .expect(200, { version: version }, done)
    })
  })

  describe('GET /image/:image', () => {
    it('should display image tags', done => {
      console.log(`        /image/${Internals.images[0]}`)
      request(app)
      .get(`/image/${Internals.images[0]}`)
      .expect(200, done)
    })

    it('should not display tags', done => {
      request(app)
      .get(`/image/not-found-image-`)
      .expect(200, done)
    })
  })
})
