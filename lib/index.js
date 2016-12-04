
var app = require('./server')
var version = require('../package').version
var PORT = process.argv[2] || process.env.PORT || '3003'

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
  console.log(`Webpage version: { version: ${version} }`)
})
