import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => axios.get(`${baseUrl}`).then((result) => result.data);

export default { getAll };
