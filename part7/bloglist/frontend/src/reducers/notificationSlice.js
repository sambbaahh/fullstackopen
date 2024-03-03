import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  type: "",
}

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.value = {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearNotification: (state) => {
      state.value = initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
