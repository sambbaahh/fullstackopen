import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./reducers/notificationSlice"
import blogReducer from "./reducers/blogSlice"

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})
