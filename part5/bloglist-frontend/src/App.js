import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
    catch{
      notify('Wrong username or password', 'alert')
    }

  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const newBlog = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification}/>
        <div>
          <p>{user.name} logged in
            <button onClick={logout}> logout </button>
          </p>
        </div>

        <h2> create new </h2>
        {newBlog()}

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>


    )
  }
}



export default App
