const request = require('supertest')
const server = require('../server')

describe('/health Endpoint', () => {
    it('should return a json response with a timestamp property', async () => {
        const res = await request(server)
            .get('/health')
        expect(res.body).toHaveProperty('timestamp')
    })

    it('should return a json response with a status property', async () => {
        const res = await request(server)
            .get('/health')
        expect(res.body.status).toEqual('ok')
    })
})
