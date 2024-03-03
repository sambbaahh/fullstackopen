import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Verifies that props have certain values', async () => {
  
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('Title')
    const inputAuthor = screen.getByPlaceholderText('Author')
    const inputUrl = screen.getByPlaceholderText('Url')
    const buttonCreate = screen.getByText('create')

    await userEvent.type(inputTitle, 'Title 1' )
    await userEvent.type(inputAuthor, 'Author 1' )
    await userEvent.type(inputUrl, 'url.com/1' )
    await userEvent.click(buttonCreate)

    expect(createBlog.mock.calls[0][0].title).toBe('Title 1')
    expect(createBlog.mock.calls[0][0].author).toBe('Author 1')
    expect(createBlog.mock.calls[0][0].url).toBe('url.com/1')

  })