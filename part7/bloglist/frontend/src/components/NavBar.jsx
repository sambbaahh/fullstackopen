import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "../reducers/userSlice"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(clearUser())
    navigate("/login")
  }

  const divStyle = {
    display: "flex",
    backgroundColor: "#D3D3D3",
    gap: "0.5rem",
    alignItems: "center",
    paddingInline: "0.25rem",
  }

  const pStyle = { marginBlock: "0.5rem" }

  return (
    <div style={divStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <p style={pStyle}>{user.name} logged in</p>
      <button onClick={logout}> logout </button>
    </div>
  )
}
