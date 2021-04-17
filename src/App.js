import React from 'react';
import './App.css';

import { Timer } from './timer.js';
import { Dog } from './dog.js';
import { Speech } from './speech.js';
import { SessionButtons, BreakButtons, ControlButtons } from './buttons.js';
import { MobileSessionButtons, MobileBreakButtons } from './mobile.js';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      timeLeft: 1500000,
      session: 25,
      break: 5,
      mode: 'work',
      started: false, 
      dog: './marylois.jpg',
      breed: 'Labradoodle'
    }
    this.breakInc = this.breakInc.bind(this)
    this.breakDec = this.breakDec.bind(this)
    this.sessionInc = this.sessionInc.bind(this)
    this.sessionDec = this.sessionDec.bind(this)
    this.reset = this.reset.bind(this)
    this.startStop = this.startStop.bind(this)
    this.countdown = this.countdown.bind(this)
    this.fetchDog = this.fetchDog.bind(this)
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
      this.fetchDog();      
      let bark = new Audio('./bark.mp3');
      bark.play();
      setTimeout(() => {
        if (this.state.mode === 'work') {
      this.setState({
        mode: 'break',
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
  
  fetchDog() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(dog => {
      let arr = dog.message.split('/');
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

      this.setState({
        dog: dog.message,
        breed: breed
      })

      let bark = new Audio('./bark.mp3');
      bark.play();
    })
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
        <Timer timeLeft={timeLeft} />
        <Speech dogSpeech={dogSpeech} />
        <Dog source={this.state.dog} breed={this.state.breed}/>
        <MobileSessionButtons session={this.state.session} sessionInc={this.sessionInc} sessionDec={this.sessionDec} />
        <MobileBreakButtons break={this.state.break} breakInc={this.breakInc} breakDec={this.breakDec}/>
        <div className="text-center" id="session-label">Work Length</div>
        <div></div>
        <div className="text-center" id="break-label">Break Length</div>
        <SessionButtons session={this.state.session} sessionInc={this.sessionInc} sessionDec={this.sessionDec}/>
        <ControlButtons function={this.startStop} label={startOrStop} reset={this.reset} fetchDog={this.fetchDog}/>
        <BreakButtons break={this.state.break} breakInc={this.breakInc} breakDec={this.breakDec} />
        <audio source="./bark.mp3" />
      </div>
    )
  }
}

export default App;
