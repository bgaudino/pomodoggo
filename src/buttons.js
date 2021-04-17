import React from 'react';
import './App.css';


export const SessionButtons = (props) => {
    return (
        <div className="number text-center" id="session-length">
            <button id="session-decrement" onClick={props.sessionDec}><i className="fas fa-minus"></i></button>
                &nbsp;{props.session}&nbsp;
          <button id="session-increment" onClick={props.sessionInc}><i className="fas fa-plus"></i></button>
        </div>
    )
}

export const BreakButtons = (props) => {
    return (
        <div className="number text-center" id="break-length"><button id="break-decrement"onClick={props.breakDec}><i className="fas fa-minus"></i></button>
            &nbsp;{props.break}&nbsp;
        <button id="break-increment" onClick={props.breakInc}><i className="fas fa-plus"></i></button></div>
    )
}

export const ControlButtons = (props) => {

    return (
        <div className="btn-group" role="group">
            <button type="button" className="btn btn-light" id="start_stop" onClick={props.function}>{props.label}</button>
            <button type="button" className="btn btn-secondary" id="fetch" onClick={props.fetchDog}>Fetch&nbsp;<i className="fas fa-bone"></i></button>
            <button type="button" className="btn btn-dark" id="reset" onClick={props.reset}>Reset</button>
        </div>
    )
    

}