import React from "react";

const TextBox = ({ text, input }) => {
  text = text.split("");

  return (
    <div className="text-box">
      {text.map((letter, index) => {
        let status = "none";
        if (index === input.length) status = "current";
        if (index < input.length)
          status = letter === input[index] ? "correct" : "incorrect";
        return <span key={Math.random() * 1000} className={status}>{letter}</span>;
      })}
    </div>
  );
};

export default TextBox;
