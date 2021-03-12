const express = require('express')
const os = require('os');

const app = express()
const port = 3000
app.use(express.json())

app.get('/uptime', (req, res) => {
    const body = {
        'timestamp': new Date().toISOString(),
        'uptime': process.uptime()
    }
    res.send(body)
})

app.get('/server/uptime', (req, res) => {
    const body = {
        'timestamp': new Date().toISOString(),
        'uptime': os.uptime()
    }
    res.send(body)
})

app.get('/health', (req, res) => {
    res.send({'status': 'ok'})
})

app.listen(port, () => console.log(`Server accessible by http://localhost:${port}`))
