import { useRef } from "react"
import Blog from "../components/Blog"
import BlogForm from "../components/BlogForm"
import Togglable from "../components/Togglable"
import { addNewBlog, addLike, deleteOneBlog } from "../reducers/blogSlice"
import blogService from "../services/blogs"
import { useSelector, useDispatch } from "react-redux"

const Blogs = (props) => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
    <>
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
    </>
  )
}

export default Blogs
