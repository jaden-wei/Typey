import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// COMPONENTS
import Home from "./components/home/Home";
import Navbar from "./components/misc/Navbar";

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <p>Login</p>
                </Route>
                <Route path="/register">
                    <p>Register</p>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
