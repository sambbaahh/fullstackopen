import { createSlice } from "@reduxjs/toolkit"

const initialState = null
// name: "",
// token: "",
// username: "",

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state) => {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
