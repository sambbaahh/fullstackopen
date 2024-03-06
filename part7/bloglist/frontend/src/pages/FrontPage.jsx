import Notification from "../components/Notification"
import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { NavBar } from "../components/NavBar"

const FrontPage = (props) => {
  const user = useSelector((state) => state.user)

  if (user === undefined || !props.isUserChecked) {
    return null
  }

  return user ? (
    <div>
      <Notification />
      <NavBar />
      <h2>blog app</h2>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  )
}

export default FrontPage
