const request = require('supertest')
const server = require('../server')

describe('/uptime Endpoint', () => {
    it('should return a json response with a timestamp property', async () => {
        const res = await request(server)
            .get('/uptime')
        expect(res.body).toHaveProperty('timestamp')
    })

    it('should return a json response with a uptime property', async () => {
        const res = await request(server)
            .get('/uptime')
        expect(res.body).toHaveProperty('uptime')
    })
})
