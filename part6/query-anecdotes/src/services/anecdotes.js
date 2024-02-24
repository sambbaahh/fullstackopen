import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => axios.get(baseUrl).then((result) => result.data);

const createNew = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((result) => result.data);

const update = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((result) => result.data);

export default { getAll, createNew, update };
