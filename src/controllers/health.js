const health = async (req, res) => {
    const body = {
        'timestamp': new Date().toISOString(),
        'status': 'ok'
    }
    res.send(body)
};

module.exports = {
    health
};
