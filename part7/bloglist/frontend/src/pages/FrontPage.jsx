import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../reducers/userSlice"
import Notification from "../components/Notification"
import { Outlet } from "react-router-dom"

const FrontPage = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(clearUser())
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}> logout </button>
      </div>
      <Outlet />
    </div>
  )
}

export default FrontPage
