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
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <form className="form" onSubmit={register}>
                <input
                    id="form-username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    id="form-name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    id="form-password"
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    id="form-passwordVerify"
                    type="password"
                    placeholder="Comfirm password"
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                />

                <button className="submit-btn" type="submit">
                    Register
                </button>
                <p className="separator">
                    <span className="separator-text">or</span>
                </p>
                <Link className="redirect-btn" to="/login">
                    Log in
                </Link>
            </form>
        </div>
    );
}

export default Register;
