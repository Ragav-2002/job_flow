const request = require('supertest')
const app = require('../../server')
const pool = require('../../db/pg-pool')

describe('basic supertest', ()=>{
    afterAll(async()=>{
        await pool.end()
    })
    it('tests GET /api/v1/users', async()=>{
        const response = await request(app).get('/api/v1/users')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
    })
    it('tests GET /api/v1/user/:id', async()=>{
        const response = await request(app).get(`/api/v1/users/90bd8a22-7804-4f85-acb2-e7b7067cd982`)
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThanOrEqual(0)
    })
})