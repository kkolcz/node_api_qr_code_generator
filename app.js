const express = require('express')
const qrcode = require('qrcode')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	res.send(`
    <h1>Simple QR Code Generator API</h1>
    <h4>Use below endpoints to generate QR Code</h4>
    <p><span>Return QR in BASE64 format: <span><code>/qr-base64?value=YOUR_VALUE</code><p>
    <p><span>Return QR in JPG format (1h expires): <span><code>/qr-img?value=YOUR_VALUE</code><p>
    <p><span>Return QR to view: <span><code>/qr-view?value=YOUR_VALUE</code><p>
    `)
})

app.get('/qr-base64', async (req, res) => {
	const value = req.query.value
	if (value) {
		console.log(`QR Code with the value: ${value}`)
		const qrCodeImage = await qrcode.toDataURL(value)
		res.send(JSON.stringify(qrCodeImage))
	} else {
		console.log(`Invalid request: ${value}`)
		res.send(`<p>Invalid request</p>`)
	}
})

app.get('/qr-img', async (req, res) => {
	res.send(`<p>Not implemented yet</p>`)
})

app.get('/qr-view', async (req, res) => {
	const value = req.query.value
	if (value) {
		console.log(`QR Code with the value: ${value}`)
		const qrCodeImage = await qrcode.toDataURL(value)
		res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`)
	} else {
		console.log(`Invalid request: ${value}`)
		res.send(`<p>Invalid request</p>`)
	}
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
