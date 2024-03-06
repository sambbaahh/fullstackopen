import { useEffect, useState } from "react"
import blogService from "./services/blogs"
import { useDispatch } from "react-redux"
import { setBlogs } from "./reducers/blogSlice"
import { setUser } from "./reducers/userSlice"
import { Route, Routes } from "react-router-dom"
import FrontPage from "./pages/FrontPage"
import Login from "./pages/Login"
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationSlice"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
import { SpecificUser } from "./components/SpecificUser"
import Blog from "./components/Blog"

const App = () => {
  const dispatch = useDispatch()
  const [isUserChecked, setIsUserChecked] = useState(false)

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
    setIsUserChecked(true)
  }, [])

  return (
    <Routes>
      <Route element={<FrontPage isUserChecked={isUserChecked} />}>
        <Route path="/" element={<Blogs notify={notify} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<SpecificUser />} />
        <Route path="/blogs/:blogId" element={<Blog />} />
      </Route>
      <Route path="/login" element={<Login notify={notify} />} />
    </Routes>
  )
}

export default App
