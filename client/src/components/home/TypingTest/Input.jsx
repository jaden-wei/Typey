import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import domain from "../../../util/domain";

const Input = ({ text, setText, input, setInput, getNewText }) => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(0);
    const [averageWpm, setAverageWpm] = useState();
    const [averageAccuracy, setAverageAccuracy] = useState();
    const interv = useRef(null);

    useEffect(() => {
        updateAverages();
    }, []);

    const inputHandler = (e) => {
        setInput(e.target.value);

        if (status === 0) startTimer();
        if (e.target.value.length >= text.length) {
            saveData();
            stopTimer();
            document.getElementById("input-box").disabled = true;
        }
    };

    const saveData = async () => {
        const testData = {
            accuracy: Math.round((100 * countCorrect()) / input.length),
            wpm: Math.round((countCorrect() * 10) / time),
        };
        await axios.post(`${domain}/test/`, testData);

        await updateAverages();

        console.log("saved new test data");
    };

    const updateAverages = async () => {
        const allTests = await (await axios.get(`${domain}/test/`)).data;
        console.log(allTests);
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

    var seconds = 0;
    const startTimer = () => {
        setStatus(1);
        interv.current = setInterval(() => {
            seconds++;
            setTime(seconds);
        }, 1000);
    };

    const stopTimer = () => {
        setStatus(2);
        clearInterval(interv.current);
    };

    const countCorrect = () => {
        return input.split("").filter((char, index) => char === text[index])
            .length;
    };

    const resetInput = () => {
        setInput("");
        setText(getNewText(10));
        document.getElementById("input-box").value = "";
        clearInterval(interv.current);
        setStatus(0);
        setTime(0);
        seconds = 0;
        document.getElementById("input-box").disabled = false;
    };

    return (
        <div className="input-container">
            <input
                onChange={inputHandler}
                type="text"
                autoComplete="off"
                placeholder="Click here to typing..."
                id="input-box"
            />
            <div className="toolbar-container">
                <div className="toolbar">
                    <p className="time-text">
                        Time: {Math.floor(time / 60)}:
                        {time % 60 < 10 ? "0" : ""}
                        {time % 60}
                    </p>
                    <p className="accuracy-text">
                        Accuracy:{" "}
                        {input.length === 0
                            ? 0
                            : Math.round((100 * countCorrect()) / input.length)}
                        %
                    </p>
                    <p className="wpm-text">
                        {" "}
                        WPM:{" "}
                        {time === 0
                            ? 0
                            : Math.round((countCorrect() * 10) / time)}
                    </p>
                    <button onClick={resetInput} className="reset-btn">
                        Reset
                    </button>
                </div>
            </div>
            <div className="averageData">
                <p>Average WPM: {averageWpm}</p>
                <p>Average Accuracy: {averageAccuracy}</p>
            </div>
        </div>
    );
};

export default Input;
