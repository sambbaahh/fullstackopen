import { useState, useEffect } from "react";
import queryService from "../queries";
import { useMutation } from "@apollo/client";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(queryService.LOGIN, {
    // onError: (error) => {
    //   setError(error.graphQLErrors[0].message);
    // },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
    props.setPage("authors");
  };

  if (!props.show) {
    return null;
  }

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  };

  return (
    <div>
      <form onSubmit={submit} style={formStyle}>
        <label>
          name
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </label>
        <button style={{ width: "fit-content" }}>login</button>
      </form>
    </div>
  );
};

export default Login;
