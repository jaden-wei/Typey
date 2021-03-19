import React, { useState } from "react";

//components
import TextBox from "./components/TextBox";
import Input from "./components/Input";
import Navbar from "./components/Navbar";

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

    const [text, setText] = useState(getNewText(10));

    //use states
    const [input, setInput] = useState("");

    return (
        <div className="App">
            <header>
                <Navbar />
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
