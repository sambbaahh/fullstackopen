import { useQuery } from "@apollo/client";
import queryService from "../queries";

const Recommendations = (props) => {
  const books = useQuery(queryService.ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{props.favoriteGenre}</b>
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
              a.genres.includes(props.favoriteGenre) && (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
