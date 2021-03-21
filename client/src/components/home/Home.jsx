import React, { useContext, useState } from "react";
import axios from "axios";
import domain from "../../util/domain";

import TextBox from "./TypingTest/TextBox";
import Input from "./TypingTest/Input";
import Data from "./TypingTest/Data";
import UserContext from "../../context/UserContext";

import "./Home.scss";

export default function Home() {
    const [averageWpm, setAverageWpm] = useState();
    const [averageAccuracy, setAverageAccuracy] = useState();

    const { user } = useContext(UserContext);

    const wordlist = require("../../wordlist.json");

    const getNewText = (count) => {
        let str = "";
        for (let i = 0; i < count; i++) {
            str += wordlist[Math.floor(Math.random() * 1000) % 980];
            if (i < count - 1) str += " ";
        }
        return str;
    };

    const updateAverages = async () => {
        if (!user) {
            setAverageWpm("Please login to use this feature");
            setAverageAccuracy("Please login to use this feature");
        }
        const allTests = await (await axios.get(`${domain}/test`)).data;

        let totalWpm = 0;
        let totalAccuracy = 0;
        for (let testIndex = 0; testIndex < allTests.length; testIndex++) {
            totalWpm += allTests[testIndex].wpm;
            totalAccuracy += allTests[testIndex].accuracy;
        }
        setAverageWpm(Math.round((totalWpm * 10) / allTests.length) / 10);
        setAverageAccuracy(
            Math.round((totalAccuracy * 10) / allTests.length) / 10
        );
    };

    const [text, setText] = useState(getNewText(50));

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
                    updateAverages={updateAverages}
                />
            </div>
            <div className="data-container">
                <Data
                    updateAverages={updateAverages}
                    averageWpm={averageWpm}
                    averageAccuracy={averageAccuracy}
                />
            </div>
        </div>
    );
}
