import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, commentContent) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.post(
    `${baseUrl}/${id}/comments`,
    {
      id,
      commentContent,
    },
    config
  )
}

export default { getAll, create, setToken, update, remove, addComment }
