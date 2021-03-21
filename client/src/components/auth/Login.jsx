import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import "./Auth.scss";

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
            password: pass,
        };

        try {
            await axios.post(`${domain}/auth/login`, loginData, {
                withCredentials: true,
            });
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
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <form className="form" onSubmit={register}>
                <input
                    id="form-user"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    id="form-pass"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <button className="submit-btn" type="submit">
                    Log in
                </button>
                <p className="separator">
                    <span className="separator-text">or</span>
                </p>
                <Link className="redirect-btn" to="/register">
                    Register
                </Link>
            </form>
        </div>
    );
}

export default Login;
