const express = require('express')
const app = express()

app.listen(3000, () => console.log('Server running on port 3000'))

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.use(express.static('dist'))

app.get('*', (_req, res) => {
	res.sendFile(`${__dirname}/dist/index.html`)
})

module.exports = app
