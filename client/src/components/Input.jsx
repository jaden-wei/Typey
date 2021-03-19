import axios from "axios";
import React, { useState, useRef } from "react";
import domain from "../util/domain";

const Input = ({ text, setText, input, setInput, getNewText }) => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(0);
    const interv = useRef(null);

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
            wpm: Math.round((countCorrect() * 10) / time)
        }
        await axios.post(`${domain}/test/`, testData);
        console.log('saved new test data');
    }

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
                placeholder="Start typing..."
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
        </div>
    );
};

export default Input;
