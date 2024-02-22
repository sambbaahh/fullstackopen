import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const addNew = async (data) => {
  const anecdoteObject = {
    content: data,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObject);
  return response.data;
};

export default { getAll, addNew };
