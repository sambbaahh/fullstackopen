import { useRef } from "react"
import BlogForm from "../components/BlogForm"
import Togglable from "../components/Togglable"
import { addNewBlog } from "../reducers/blogSlice"
import blogService from "../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blogs = (props) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(addNewBlog(returnedBlog))
      props.notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    })
  }

  const noteFormRef = useRef()

  return (
    <>
      <Togglable buttonLabel="create new" ref={noteFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {/* Create copy "[...blogs]" because sort mutates the blogs array!! */}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </>
  )
}

export default Blogs
