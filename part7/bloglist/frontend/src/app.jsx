import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    }
    catch {
      notify('Wrong username or password', 'alert')
    }

  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const addBlog = (blogObject) => {
    noteFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      })
  }

  const updateLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const deleteBlog = blog => {
    const deletedBlogID = blog.id
    blogService
      .remove(deletedBlogID)
      .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== deletedBlogID))
      })
  }
  const noteFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} username={username}
          setUsername={setUsername} password={password} setPassword={setPassword} />
      </div>
    )
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <div>
          <p>{user.name} logged in
            <button onClick={logout}> logout </button>
          </p>
        </div>

        <h2> create new </h2>
        <Togglable buttonLabel="new blog" ref={noteFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} deleteBlog={deleteBlog} />
          )}
      </div>
    )
  }
}

export default App
