import { useState, useEffect } from "react";
import GetDiaries from "./services/GetDiaries";
import AddEntry from "./services/AddEntry";
import { Diary, DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  

  const addEntry = async ()  => {
    try{
      const data:DiaryEntry = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      }
      await AddEntry(data)
      await fetchData();
    } catch(e){
      setError(e as string);
      setTimeout(() => {
        setError("");
      }, 5000)
    }
  }

  const fetchData = async () => {
    try {
      const result = await GetDiaries();
      setDiaries(result);
    } catch (error) {
      console.error("Error fetching diaries:", error);
      setDiaries([]); // Voit määritellä diaries-tilan käsittelyä virhetilanteessa
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1> Add new entry </h1>
      <p style={{color:"red"}}>{`${error}`}</p>
      <div style={{ display: "inline-block-container" }}>
        <p style={{ display: "inline" }}> date </p>
        <input type="date" style={{ display: "inline" }} onChange={(event) => setDate(event.target.value)} />
      </div>
      <div style={{ display: "inline-block-container" }}>
        <p style={{ display: "inline" }}> visibility </p>
        <label>great</label>
        <input type="radio" value="great" name="visibility" style={{ display: "inline" }} onChange={(event) => setVisibility(event.target.value)} />
        <label>good</label>
        <input type="radio" value="good" name="visibility" style={{ display: "inline" }} onChange={(event) => setVisibility(event.target.value)} />
        <label>ok</label>
        <input type="radio" value="ok" name="visibility" style={{ display: "inline" }} onChange={(event) => setVisibility(event.target.value)} />
        <label>poor</label>
        <input type="radio" value="poor" name="visibility" style={{ display: "inline" }} onChange={(event) => setVisibility(event.target.value)} />

      </div>
      <div style={{ display: "inline-block-container" }}>
        <p style={{ display: "inline" }}> weather </p>
        <label>sunny</label>
        <input type="radio" value="sunny" name="weather" style={{ display: "inline" }} onChange={(event) => setWeather(event.target.value)} />
        <label>rainy</label>
        <input type="radio" value="rainy" name="weather" style={{ display: "inline" }} onChange={(event) => setWeather(event.target.value)} />
        <label>cloudy</label>
        <input type="radio" value="cloudy" name="weather" style={{ display: "inline" }} onChange={(event) => setWeather(event.target.value)} />
        <label>stormy</label>
        <input type="radio" value="stormy" name="weather" style={{ display: "inline" }} onChange={(event) => setWeather(event.target.value)} />
        <label>windy</label>
        <input type="radio" value="windy" name="weather" style={{ display: "inline" }} onChange={(event) => setWeather(event.target.value)} />
      </div>
      <div style={{ display: "inline-block-container" }}>
        <label>comment</label>
        <input type="text" style={{ display: "inline" }} onChange={(event) => setComment(event.target.value)} />
      </div>
      <button onClick={addEntry}>add</button>

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