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
    document.querySelector('#beep').pause();
    document.querySelector('#beep').currentTime = 0;
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
 fetchDog();      document.getElementById('beep').play();
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
    let mode = this.state.mode.charAt(0).toUpperCase() + this.state.mode.slice(1);
    
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
            <div class="bubble"><span id="dog-speech">{dogSpeech}</span></div>
            <div class="pointer"></div>
          </div>
        </div>
        <figure class="figure text-center">
          <img src="marylois.png" id="dog" class="figure-img img-thumbnail rounded" alt="Dog" />
          <figcaption class="figure-caption">Labradoodle</figcaption>
        </figure>
        <div class="text-center" id="timer-label">{mode}</div>
          <div class="text-center" id="session-label">
            Work Length
          </div>
        <div class="text-center" id="break-label">
            Break Length
          </div>
          <div class="number text-center" id="session-length">
             <button id="session-decrement" onClick={this.sessionDec}><i class="far fa-minus-square"></i></button>
            {this.state.session}
            <button id="session-increment" onClick={this.sessionInc}><i class="far fa-plus-square"></i></button>
          </div>
        <div class="number text-center" id="break-length"><button id="break-decrement"onClick={this.breakDec}><i class="far fa-minus-square"></i></button>
        {this.state.break}
        <button id="break-increment" onClick={this.breakInc}><i class="far fa-plus-square"></i></button></div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-light" id="start_stop" onClick={this.startStop}>{startOrStop}</button>
          <button type="button" class="btn btn-secondary" id="fetch"><i class="fas fa-bone"></i>&nbsp;Fetch&nbsp;<i class="fas fa-bone"></i></button>
          <button type="button" class="btn btn-dark" id="reset" onClick={this.reset}>Reset</button>
        </div>
          
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
    let breed = arr[4].replace('-', ' ');
    breed = breed.charAt(0).toUpperCase() + breed.slice(1);
    document.querySelector('figcaption').innerText = breed;
  })
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#fetch').onclick = function() {
    fetchDog();
  };

})



export default Timer;
