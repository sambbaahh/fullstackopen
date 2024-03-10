import { useQuery } from "@apollo/client";
import queryService from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres");
  const [allGenres, setAllGenres] = useState(new Set());

  const books = useQuery(queryService.ALL_BOOKS);

  useEffect(() => {
    if (!books.loading) {
      books.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          setAllGenres((prevState) => new Set([...prevState, genre]));
        });
      });
    }
  }, [books.data]);

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{selectedGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map(
            (a) =>
              (selectedGenre === "all genres" ||
                a.genres.includes(selectedGenre)) && (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
      {Array.from(allGenres).map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre("all genres")}>all genres</button>
    </div>
  );
};

export default Books;
