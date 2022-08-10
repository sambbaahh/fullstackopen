const blogsRouter = require('express').Router()
const { findByIdAndUpdate } = require('../models/blog')
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if ((!blog.title) && (!blog.url)) {
        response.status(400).json({ error: 'title and url missing' })
    }
    else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter