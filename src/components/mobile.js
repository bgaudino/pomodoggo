import React from 'react';
import '../App.css';

export const MobileSessionButtons = (props) => {
    return (
        <div className="input-group mobile-buttons">
            <span className="input-group-text">Work</span>
            <button id="session-decrement" onClick={props.sessionDec}><i className="fas fa-minus"></i></button>
            <input className="form-control" type="number" value={props.session} readOnly></input>              
            <button id="session-increment" onClick={props.sessionInc}><i className="fas fa-plus"></i></button>
        </div>
    )
}
export const MobileBreakButtons = (props) => {
    return (
        <div className="input-group mobile-buttons">
            <span id="mobile-break-label" className="input-group-text">Break</span>
            <button id="break-decrement" onClick={props.breakDec}><i className="fas fa-minus"></i></button>
            <input className="form-control" type="number" value={props.break} readOnly></input>
            <button id="break-increment" onClick={props.breakInc}><i className="fas fa-plus"></i></button>
        </div>
    )
}