import React from 'react';
import './App.css';

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timeLeft: 1500000,
      session: 25,
      break: 5,
      mode: 'work',
      started: false
    }
    this.breakInc = this.breakInc.bind(this)
    this.breakDec = this.breakDec.bind(this)
    this.sessionInc = this.sessionInc.bind(this)
    this.sessionDec = this.sessionDec.bind(this)
    this.reset = this.reset.bind(this)
    this.startStop = this.startStop.bind(this)
    this.countdown = this.countdown.bind(this)
  }
  
  
  breakInc() {
    if (this.state.break < 60) {
      this.setState({
        break: this.state.break + 1
      })
    }
  }
  
  breakDec() {
    if (this.state.break > 1) {
      this.setState({
        break: this.state.break - 1
      })
    }
  }
  
  sessionInc() {
    if (this.state.session < 60) {
      this.setState({
        session: this.state.session + 1
      })
    }
    if (this.state.mode === 'work' && this.state.timeLeft < 3600000) {
      this.setState({
        timeLeft: this.state.timeLeft + 60000
      })
    }
  }
  
  sessionDec() {
    if (this.state.session > 1) {
      this.setState({
        session: this.state.session - 1
      })
    }
    if (this.state.mode === 'work' && this.state.timeLeft > 60000) {
      this.setState({
        timeLeft: this.state.timeLeft - 60000
      })
    }
  }
  
  reset() {
        clearInterval(this.interval);
    this.setState({
      session: 25,
      break: 5,
      timeLeft: 1500000,
      mode: 'work',
      started: false
    })
  }
  
  countdown() {
      this.setState({
      timeLeft: this.state.timeLeft - 1000
    })
    if (this.state.timeLeft === 0) {
      fetchDog();      
      let bark = new Audio('./bark.mp3');
      bark.play();
      setTimeout(() => {
        if (this.state.mode === 'work') {
      this.setState({
        mode: 'break 🏖',
        timeLeft: this.state.break * 60000
      })
    } else {
      this.setState({
        mode: 'work',
        timeLeft: this.state.session * 60000
      })
    } 
      }, 1000)
    
    }
  }
  
  startStop() {
    if (!this.state.started) {
      this.interval = setInterval(() => this.countdown(), 1000)
      this.setState({
        started: true
      })
    } else {
      clearInterval(this.interval)
      this.setState({
        started: false
      })
    }
  }
  
  
  render() {
    let startOrStop = '';
    if (this.state.started) {
      startOrStop = 'Stop';
    } else {
      startOrStop = 'Start';
    }
    const root = document.querySelector('#root');
    if (this.state.mode === 'work') {
     root.style.backgroundColor = '#e5593f';
    } else {
      root.style.backgroundColor = '#4783ff';
    }
    
    let timeLeft = '00:00';
    if (this.state.timeLeft > 0) {
        const totalSeconds = this.state.timeLeft / 1000;
    let seconds = totalSeconds % 60;
    let minutes = (totalSeconds - seconds) / 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    timeLeft = `${minutes}:${seconds}`;
    }

    let dogSpeech = '';
    if (this.state.started) {
      if (this.state.mode === 'work') {
        dogSpeech = 'Get to work!';
      } else {
        dogSpeech = 'Time for a break';
      } 
    } else {
      dogSpeech = 'Ready when you are...'
    }
    
    return (
      <div id="app">
        <div id="title">
          <h1>🐶 pomoDoggo </h1>
          <hr />
        </div>
        <div id="time-left">
          {timeLeft}
        </div>

        <div id="speech">
          <div>
            <div className="bubble"><span id="dog-speech">{dogSpeech}</span></div>
            <div className="pointer"></div>
          </div>
        </div>
        <figure className="figure text-center">
          <img src="marylois.png" id="dog" className="figure-img img-thumbnail rounded" alt="Dog" />
          <figcaption className="figure-caption">Labradoodle</figcaption>
        </figure>

        <div className="text-center" id="session-label">
            Work Length
          </div>
          <div></div>
          <div className="text-center" id="break-label">
            Break Length
          </div>
        
        
          <div className="number text-center" id="session-length">
             <button id="session-decrement" onClick={this.sessionDec}><i className="fas fa-minus"></i></button>
             &nbsp;{this.state.session}&nbsp;
            <button id="session-increment" onClick={this.sessionInc}><i className="fas fa-plus"></i></button>
          </div>
          <div className="input-group mobile-buttons">
              <span className="input-group-text">Work</span>
              <button id="session-decrement" onClick={this.sessionDec}><i className="fas fa-minus"></i></button>
              <input className="form-control" type="number" value={this.state.session} readOnly></input>              
              <button id="session-increment" onClick={this.sessionInc}><i className="fas fa-plus"></i></button>
          </div>
          
          <div className="input-group mobile-buttons">
              <span id="mobile-break-label" className="input-group-text">Break</span>
              <button id="break-decrement" onClick={this.breakDec}><i className="fas fa-minus"></i></button>
              <input className="form-control" type="number" value={this.state.break} readOnly></input>
              <button id="break-increment" onClick={this.breakInc}><i className="fas fa-plus"></i></button>
          </div>
          
          <div className="btn-group" role="group">
          <button type="button" className="btn btn-light" id="start_stop" onClick={this.startStop}>{startOrStop}</button>
          <button type="button" className="btn btn-secondary" id="fetch">Fetch&nbsp;<i className="fas fa-bone"></i></button>
          <button type="button" className="btn btn-dark" id="reset" onClick={this.reset}>Reset</button>
        </div>
        <div className="number text-center" id="break-length"><button id="break-decrement"onClick={this.breakDec}><i className="fas fa-minus"></i></button>
        &nbsp;{this.state.break}&nbsp;
        <button id="break-increment" onClick={this.breakInc}><i className="fas fa-plus"></i></button></div>

      </div>
    )
  }
}

function fetchDog() {
fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(dog => {
    const img = document.querySelector('img');
    img.src = dog.message;
    let arr = dog.message.split('/');
    console.log(arr[4]);
    const regexTwo = /-.+/g;
    const regexOne = /.+-/g;
    let wordTwo = arr[4].replace(regexTwo, '');
    let wordOne = arr[4].replace(regexOne, '');
    wordOne = wordOne.charAt(0).toUpperCase() + wordOne.slice(1);
    wordTwo = wordTwo.charAt(0).toUpperCase() + wordTwo.slice(1);
    if (wordTwo === wordOne) {
      wordTwo = '';
    }
    let breed = `${wordOne} ${wordTwo}`;
    console.log(arr[4]);
    document.querySelector('figcaption').innerText = breed.trim();

  })
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#fetch').onclick = function() {
    fetchDog();
  };

})



export default Timer;
