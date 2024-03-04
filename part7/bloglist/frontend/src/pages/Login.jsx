import { useState } from "react"
import { useDispatch } from "react-redux"
import loginService from "../services/login"
import LoginForm from "../components/LoginForm"
import Notification from "../components/Notification"
import blogService from "../services/blogs"
import { setUser } from "../reducers/userSlice"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate("/")

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
      navigate("/")
    } catch {
      props.notify("Wrong username or password", "alert")
    }
  }

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

export default Login
