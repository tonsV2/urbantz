const server = require('./src/server')

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server accessible by http://localhost:${port}`))
