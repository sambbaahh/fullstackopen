import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { addLike, deleteOneBlog } from "../reducers/blogSlice"
import blogService from "../services/blogs"

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { blogId } = useParams()

  const [blog, setBlog] = useState("")

  useEffect(() => {
    setBlog(blogs.find((value) => value.id === blogId))
  }, [blogs])

  const updateLike = (blog) => {
    const id = blog.id
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    blogService.update(id, updatedBlog).then(() => {
      dispatch(addLike({ id }))
    })
  }

  const removeBlog = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id).then(() => {
        dispatch(deleteOneBlog({ id }))
      })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  }

  if (!blog) {
    return null
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog">
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={() => updateLike(blog)}>like</button>
        </div>
        <div>added by {blog.author}</div>
        {blog.user.id === user.id ? (
          <button onClick={() => removeBlog(blog.id)}> remove </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Blog
