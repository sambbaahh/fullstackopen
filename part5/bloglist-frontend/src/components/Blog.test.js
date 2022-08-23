import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog default content', () => {
  const blog = {
    title: 'title 1',
    author: 'author 1',
    likes: 121,
    url: 'test1.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.url)
})


test('view button shows all details of the blogpost', async () => {
    const blog = {
      title: 'title 1',
      author: 'author 1',
      likes: 121,
      url: 'test1.com',
      user: {
        username: 'kalle'
      }
    }

    const user = {
        username: 'kalle'
    }
  
    const { container } = render(<Blog blog={blog} user = {user}/>)

    const userPress = userEvent.setup()
    const button = screen.getByText('view')
    await userPress.click(button)
  
    const div = container.querySelector('.blog')
  
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)
  })


  test('verifies that like button is pressed twice', async () => {
    const blog = {
      title: 'title 1',
      author: 'author 1',
      likes: 121,
      url: 'test1.com',
      user: {
        username: 'kalle'
      }
    }

    const user = {
        username: 'kalle'
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} user = {user} updateLikes= {mockHandler}/>)

    const userPress = userEvent.setup()
    const buttonView = screen.getByText('view')
    await userPress.click(buttonView)
  
    const div = container.querySelector('.blog')
  
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.url)

    const buttonLike = screen.getByText('like')
    await userPress.click(buttonLike)
    await userPress.click(buttonLike)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })