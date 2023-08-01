import axios from "axios";
import { Diary,DiaryEntry } from "../types";

const AddEntry = async (data: DiaryEntry) => {
    try {
      const response = await axios.post<Diary>("http://localhost:3001/api/diaries", data);
      return response.data;
    } catch (error) {
        if (error instanceof Error) {
          throw error; 
        } else {
            throw new Error((error as string).toString());        }
      }
  };
  
  export default AddEntry;