const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

app.get('/uptime', (req, res) => {
    res.send('Hello World!')
})

app.get('/server/uptime', (req, res) => {
    res.send('Hello World!')
})

app.get('/health', (req, res) => {
    res.send({'status': 'ok'})
})

app.listen(port, () => console.log(`Server accessible by http://localhost:${port}`))
