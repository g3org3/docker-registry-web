
var app = require('./server')
var PORT = process.argv[2] || process.env.PORT || '3003'

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
