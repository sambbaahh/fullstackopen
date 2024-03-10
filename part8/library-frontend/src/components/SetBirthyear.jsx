import { useMutation } from "@apollo/client";
import { useState } from "react";
import queryService from "../queries";

const SetBirthyear = (props) => {
  const [year, setYear] = useState("");
  const [name, setName] = useState(props.authors[0]?.name);

  const [setAuthorBirthyear] = useMutation(queryService.SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: queryService.ALL_AUTHORS }],
  });

  const updateAuthor = (event) => {
    event.preventDefault();
    setAuthorBirthyear({ variables: { year, name } });

    setYear("");
    setName(props.authors[0].name);
  };

  const divStyle = {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    gap: "1rem",
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor} style={divStyle}>
        <select value={name} onChange={(event) => setName(event.target.value)}>
          {props.authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <label>
          born{" "}
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(parseInt(event.target.value))}
          />
        </label>
        <button>update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
