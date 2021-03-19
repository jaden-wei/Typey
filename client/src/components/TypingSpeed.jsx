import React from 'react';

const TypingSpeed = ({correct, seconds}) => {
    if (correct !== 0 && seconds !== 0) {
        const wpm = (correct/5) / (seconds/60);

        return(
            <div>{Math.round(wpm)} words per minute</div>
        );
    }

    return 0;
}

export default TypingSpeed;