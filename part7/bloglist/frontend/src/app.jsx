import { useEffect } from "react"
import blogService from "./services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { setBlogs } from "./reducers/blogSlice"
import { setUser } from "./reducers/userSlice"
import { Navigate, Route, Routes } from "react-router-dom"
import FrontPage from "./pages/FrontPage"
import Login from "./pages/Login"
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationSlice"
import Blogs from "./components/Blogs"
import Users from "./components/Users"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  //This could be better to create in redux thunk (we need this in Login and LandingPage)
  //This time I just pass this by props
  const notify = (message, type = "info") => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

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

  return (
    <Routes>
      {!user.token ? (
        <Route path="/" element={<Login notify={notify} />} />
      ) : (
        <Route path="/" element={<FrontPage notify={notify} />}>
          <Route index element={<Blogs notify={notify} />} />
          <Route path="/users" element={<Users />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
