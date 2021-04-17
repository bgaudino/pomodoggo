import React from 'react';
import './App.css';

export const Speech = (props) => {
    return (
        <div id="speech">
          <div>
            <div className="bubble shadow"><span id="dog-speech">{props.dogSpeech}</span></div>
            <div className="pointer "></div>
          </div>
        </div>
    )
}