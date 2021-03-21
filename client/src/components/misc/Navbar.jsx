import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";
import axios from "axios";

import "./Navbar.scss";

export default function Navbar() {
    const { user, getUser } = useContext(UserContext);

    const logOut = async () => {
        await axios.get(`${domain}/auth/logOut`);
        await getUser();
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="logo">
                    <Link to="/">Typing Test</Link>
                </div>
                <div className="navbar-tabs">
                    {user === null ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        user && (
                            <button onClick={logOut} className="logout-btn">
                                Log out
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
