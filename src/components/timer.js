import React from 'react';
import '../App.css';

export const Timer = (props) => {
    return (
        <div id="time-left">
            {props.timeLeft}
        </div>
    )
}