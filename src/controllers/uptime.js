const os = require('os')

const uptime = async (req, res) => {
    const body = {
        'timestamp': new Date().toISOString(),
        'uptime': process.uptime()
    }
    res.send(body)
}

const serverUptime = async (req, res) => {
    const body = {
        'timestamp': new Date().toISOString(),
        'uptime': os.uptime()
    }
    res.send(body)
}

module.exports = {
    uptime,
    serverUptime
}
