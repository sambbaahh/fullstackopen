const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let authorization

beforeEach(async () => {
    const newUser = {
        username: 'testUser',
        name: 'Test User',
        password: 'password',
    }
    await api
        .post('/api/users')
        .send(newUser)

    const result = await api
        .post('/api/login')
        .send(newUser)

    authorization = `bearer ${result.body.token}`
})

describe('bloglist tests', () => {
    test('return 400 error if username or password are less than three characters', async () => {
        const newUser = {
            username: "Mi",
            name: "Mike halko",
            password: "admin456"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('return 400 error if username exists', async () => {
        const newUser = {
            username: "Misakke",
            name: "Mike halko",
            password: "admin456"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .set('Authorization', authorization)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const errorUser = {
            username: "Misakke",
            name: "Mike halko",
            password: "admin456"
        }
        await api
            .post('/api/users')
            .send(errorUser)
            .set('Authorization', authorization)
            .expect(400)

    })



    afterAll(() => {
        mongoose.connection.close()
    })
})