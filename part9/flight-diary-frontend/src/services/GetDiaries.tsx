import axios from "axios";
import { Diary } from "../types";

const GetDiaries = async () => {
    try {
      const response = await axios.get<Diary[]>("http://localhost:3001/api/diaries");
      return response.data;
    } catch (error) {
      console.error("Error fetching diaries:", error);
      return [];
    }
  };
  
  export default GetDiaries;