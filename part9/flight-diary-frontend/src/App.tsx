import { useState, useEffect } from "react";
import GetDiaries from "./services/GetDiaries";
import { Diary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetDiaries();
        setDiaries(result);
      } catch (error) {
        console.error("Error fetching diaries:", error);
        setDiaries([]); // Voit määritellä diaries-tilan käsittelyä virhetilanteessa
      }
    };
  
    fetchData();
    console.log(diaries)
  }, []);

return (
  <div>
    <h1> Diary Entries </h1>
    {diaries.map((diary: Diary) => (
      <div key={diary.id}>
        <h2> {diary.date} </h2>
        <p> {` visibility: ${diary.visibility}`}</p>
        <p> {` weather: ${diary.weather}`}</p>
      </div>
    ))}
  </div>
);
};

export default App;