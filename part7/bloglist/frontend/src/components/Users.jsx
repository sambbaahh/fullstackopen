import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const [blogMap, setBlogMap] = useState(new Map())

  const handleBlogMap = () => {
    const newBlogMap = new Map()

    blogs.forEach((blog) => {
      if (newBlogMap.get(blog.user.id)) {
        newBlogMap.set(blog.user.id, {
          ...newBlogMap.get(blog.user.id),
          blogCount: newBlogMap.get(blog.user.id).blogCount + 1,
        })
      } else {
        newBlogMap.set(blog.user.id, { name: blog.user.name, blogCount: 1 })
      }
    })
    setBlogMap(newBlogMap)
  }

  useEffect(() => {
    if (blogs) {
      handleBlogMap()
    }
  }, [blogs])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(blogMap).map(([key, value]) => (
            <tr key={key}>
              <td>
                <Link to={`/users/${key}`}>{value.name}</Link>
              </td>
              <td>{value.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
