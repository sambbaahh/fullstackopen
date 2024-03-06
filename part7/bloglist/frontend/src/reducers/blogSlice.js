import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  // {
  //   id: "",
  //   user: {
  //     id: "",
  //     name: "",
  //     username: "",
  //   },
  //   likes: 0,
  //   author: "",
  //   title: "",
  //   url: "",
  // },
]

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload.map((blog) =>
        blog.likes ? blog : { ...blog, likes: 0 }
      )
    },
    addNewBlog: (state, action) => {
      return [...state, { ...action.payload, likes: 0 }]
    },
    addLike: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )
    },
    newComment: (state, action) => {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...blog,
              comments: [...blog.comments, { content: action.payload.comment }],
            }
          : blog
      )
    },
    deleteOneBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, addNewBlog, addLike, deleteOneBlog, newComment } =
  blogSlice.actions

export default blogSlice.reducer
