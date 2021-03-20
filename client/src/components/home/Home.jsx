import React, { useState } from "react";

import TextBox from "./TypingTest/TextBox";
import Input from "./TypingTest/Input";

import "./Home.scss";

export default function Home() {
    const wordlist = require("../../wordlist.json");

    const getNewText = (count) => {
        let str = "";
        for (let i = 0; i < count; i++) {
            str += wordlist[Math.floor(Math.random() * 1000) % 980];
            if (i < count - 1) str += " ";
        }
        return str;
    };

    const [text, setText] = useState(getNewText(60));

    //use states
    const [input, setInput] = useState("");

    return (
        <div className="home">
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
