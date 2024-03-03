import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title: title,
          author: author,
          url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    id = 'title'
                    value={title}
                    onChange={handleTitleChange}
                    placeholder='Title'
                />
            </div>
            <div>
                author:
                <input
                    id = 'author'
                    value={author}
                    onChange={handleAuthorChange}
                    placeholder='Author'
                />
            </div>
            <div>
                url:
                <input
                    id = 'url'
                    value={url}
                    onChange={handleUrlChange}
                    placeholder='Url'
                />
            </div>
            <button id = "create-button" type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm