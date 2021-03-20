import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

import ErrorMessage from "../misc/ErrorMessage";

function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const loginData = {
        username: username,
        password: pass
    }

    try {
      await axios.post(`${domain}/auth/login`, loginData, 
      { withCredentials: true });
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    await getUser();
    history.push("/");
  }

  return (
    <div className="auth-form">
      <h2>Log in</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form className="form" onSubmit={register}>
        <label htmlFor="form-username">Username</label>
        <input
          id="form-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Log in
        </button>
      </form>
      <p>
        DOn't have an account yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
