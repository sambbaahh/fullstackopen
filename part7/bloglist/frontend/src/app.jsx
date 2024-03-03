import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import { useDispatch, useSelector } from "react-redux"
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationSlice"
import {
  addLike,
  addNewBlog,
  deleteOneBlog,
  setBlogs,
} from "./reducers/blogSlice"
import { clearUser, setUser } from "./reducers/userSlice"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => {
      dispatch(setBlogs(fetchedBlogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      dispatch(setUser(user))

      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
    } catch {
      notify("Wrong username or password", "alert")
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(clearUser())
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      dispatch(addNewBlog(returnedBlog))
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
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

  if (!user.token) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  if (user !== null) {
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
}

export default App
