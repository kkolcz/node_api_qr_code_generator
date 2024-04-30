const express = require('express')
const qrcode = require('qrcode')
const { v4: uuidv4 } = require('uuid')

const app = express()
const address = 'http://localhost:3000'
const folderName = 'public'
const port = 3000

app.use(express.static('public'))

const generateFile = value => {
	const fileName = uuidv4()
	const imgLink = `${address}/${fileName}.jpg`
	console.log(`QR Code with the value: ${value}`)
	qrcode.toFile(`${folderName}/${fileName}.jpg`, value)
	return imgLink
}

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
	const value = req.query.value
	if (value) {
		const imgLink = generateFile(value)
		console.log(`QR Code with the value: ${value}`)

		res.send(`
		<p><img src="${imgLink}" alt="Generated qr code"></p>
		<p><code>${imgLink}</code></p>
		<p><a href="${imgLink}">Link to QR Code</a></p>
		`)
	} else {
		console.log(`Invalid request: ${value}`)
		res.send(`<p>Invalid request</p>`)
	}
	//res.send(`<p>Not implemented yet</p>`)
})

app.get('/qr-img-url', async (req, res) => {
	const value = req.query.value
	if (value) {
		const imgLink = generateFile(value)
		console.log(`QR Code with the value: ${value}`)

		res.send(JSON.stringify({ url: imgLink }))
	} else {
		console.log(`Invalid request: ${value}`)
		res.send(`<p>Invalid request</p>`)
	}
	//res.send(`<p>Not implemented yet</p>`)
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
