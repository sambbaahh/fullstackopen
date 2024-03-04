import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const SpecificUser = () => {
  let { userId } = useParams()
  const blogs = useSelector((state) => state.blogs)

  if (!userId || !blogs) {
    return null
  }

  return (
    <div>
      <h1> {blogs.find((blog) => blog.user.id === userId)?.user?.name} </h1>
      <h2> blogs added </h2>
      <ul>
        {blogs.map(
          (blog) =>
            blog.user.id === userId && <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}
