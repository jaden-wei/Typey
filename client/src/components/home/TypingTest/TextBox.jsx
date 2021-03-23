import React from "react";
import "./TestBox.scss";

const TextBox = ({ text, input }) => {
  text = text.split("");

  return (
    <div className="text-box">
      {text.map((letter, index) => {
        let status = "none";
        if (index === input.length) status = "current";
        if (index < input.length)
          status = letter === input[index] ? "correct" : "incorrect";
        return <span key={Math.random() * 970} className={status}>{letter}</span>;
      })}
    </div>
  );
};

export default TextBox;
