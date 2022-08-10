const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('bloglist tests', () => {
    test('notes are returned as json and length is 3', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(Object.keys(response.body).length === 3)
    })

    test('correct id exists', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()

    })

    test('blog can be added', async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2
        }

        const responseBefore = await api.get('/api/blogs')
        const responseLength = Object.keys(responseBefore.body).length

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const responseAfter = await api.get('/api/blogs')

        expect(responseLength === responseLength + 1)
        const title = responseAfter.body.map(x => x.title)
        expect(title).toContain('Type wars')

    })

    test('if likes is empty, set zero', async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.at(-1).likes === 0)
    })

    test('return 400 if url and title are empty', async () => {
        const newBlog = {
            author: "Robert C. Martin",
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('delete specific blog', async () => {
        const response = await api.get('/api/blogs')
        const idDelete = response.body.at(-1).id

        await api
            .delete(`/api/blogs/${idDelete}`)
            .expect(204)
    })

    test('update specific blog', async () => {
        const response = await api.get('/api/blogs')
        const idPut = response.body.at(-1).id

        const updateLikes = {
            likes: 10099
        }

        await api
            .put(`/api/blogs/${idPut}`)
            .send(updateLikes)
            .expect(200)

        const responseAfter = await api.get('/api/blogs')
        expect(responseAfter.body.at(-1).likes === 10099)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})
