import React, { useState } from "react";
import "./App.css";

//components
import TextBox from "./components/TextBox";
import Input from "./components/Input";

function App() {
    const wordlist = require("./wordlist.json");

    const getNewText = (count) => {
        let str = "";
        for (let i = 0; i < count; i++) {
            str += wordlist[Math.floor(Math.random() * 1000) % 980];
            if (i < count - 1) str += " ";
        }
        return str;
    };

    const [text, setText] = useState(getNewText(30));

    //use states
    const [input, setInput] = useState("");

    return (
        <div className="App">
            <header>
                <h1>Typing Test</h1>
            </header>
            <TextBox text={text} input={input} />
            <Input
                text={text}
                setText={setText}
                input={input}
                setInput={setInput}
                getNewText={getNewText}
            />
        </div>
    );
}

export default App;
