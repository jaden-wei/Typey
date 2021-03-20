import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">Typing Test</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}
