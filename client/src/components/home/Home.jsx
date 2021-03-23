import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import domain from "../../util/domain";

import TextBox from "./TypingTest/TextBox";
import Input from "./TypingTest/Input";
import Data from "./TypingTest/Data";
import UserContext from "../../context/UserContext";

import "./Home.scss";

export default function Home() {
    const [userData, setUserData] = useState([]);

    const { user } = useContext(UserContext);

    const wordlist = require("../../wordlist.json");

    useEffect(() => {
        if (!user) {
            setUserData([]);
        } else updateUserData();
    }, [user]);

    const updateUserData = async () => {
        const res = await axios.get(`${domain}/test`);
        setUserData(res.data);
    };

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
        <div className="home">
            <div className="test-container">
                <TextBox text={text} input={input} />
                <Input
                    text={text}
                    setText={setText}
                    input={input}
                    setInput={setInput}
                    getNewText={getNewText}
                    updateUserData={updateUserData}
                />
            </div>
            <div className="data-container">
                <Data
                    userData={userData}
                    updateAverages={updateUserData}
                />
            </div>
        </div>
    );
}
