import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

import ErrorMessage from "../misc/ErrorMessage";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      username: username,
      name: name,
      password: pass,
      passwordConfirm: passConfirm,
    };

    try {
      await axios.post(`${domain}/auth/register`, registerData);
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
      <h2>Register a new account</h2>
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
        <label htmlFor="form-name">Name</label>
        <input
          id="form-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <label htmlFor="form-passwordVerify">Confirm Password</label>
        <input
          id="form-passwordVerify"
          type="password"
          value={passConfirm}
          onChange={(e) => setPassConfirm(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
}

export default Register;
