import React from "react";
import "./styling/App.scss";
import { UserContextProvider } from "./context/UserContext";

//components
import Router from "./Router";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    return (
        <UserContextProvider>
            <div className="App">
                <Router />
            </div>
        </UserContextProvider>
    );
}

export default App;
