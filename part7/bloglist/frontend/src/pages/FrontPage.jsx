import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewBlog, addLike, deleteOneBlog } from "../reducers/blogSlice"
import { clearUser } from "../reducers/userSlice"
import Blog from "../components/Blog"
import BlogForm from "../components/BlogForm"
import Togglable from "../components/Togglable"
import Notification from "../components/Notification"
import blogService from "../services/blogs"

const FrontPage = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(clearUser())
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(addNewBlog(returnedBlog))
      props.notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    })
  }

  const updateLikes = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      dispatch(addLike({ id }))
    })
  }

  const deleteBlog = (blog) => {
    const id = blog.id
    blogService.remove(id).then((returnedBlog) => {
      dispatch(deleteOneBlog({ id }))
    })
  }

  const noteFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>
          {user.name} logged in
          <button onClick={logout}> logout </button>
        </p>
      </div>

      <h2> create new </h2>
      <Togglable buttonLabel="new blog" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {/* Create copy "[...blogs]" because sort mutates the blogs array!! */}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default FrontPage
