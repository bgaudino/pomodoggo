import React from 'react';
import './App.css';

import fetchDog from './api/fetchDog';
import usePeristedState from './hooks/usePersistedState';
import Dog from './components/Dog';
import Timer from './components/Timer';
import Slider from './components/Slider';
import SpeechBubble from './components/SpeechBubble';

function App() {
  const [dog, setDog] = React.useState('');
  const [workLength, setWorkLength] = usePeristedState('workLength', 25);
  const [breakLength, setBreakLength] = usePeristedState('breakLength', 5);
  const [secondsRemaining, setSecondsRemaining] = usePeristedState(
    'secondsRemaining',
    workLength * 60
  );
  const [isWorking, setIsWorking] = usePeristedState('isWorking', true);
  const [isActive, setIsActive] = React.useState(false);
  const interval = React.useRef<number>();

  const updateDog = React.useCallback(() => {
    fetchDog().then((dog) => setDog(dog));
    if (isActive) {
      new Audio('bark.mp3').play();
    }
  }, [isActive]);
  const countdown = React.useCallback(
    () => setSecondsRemaining((prev: number) => prev - 1),
    []
  );
  const reset = React.useCallback(() => {
    setIsActive(false);
    setIsWorking(true);
    setSecondsRemaining(workLength * 60);
  }, [workLength]);
  const setLength = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>, lengthType: 'work' | 'break') => {
      const value = e.currentTarget.valueAsNumber;
      if (Number.isNaN(value)) {
        return;
      }
      if (lengthType === 'work') {
        setWorkLength(value);
        if (isWorking && !isActive) {
          setSecondsRemaining(60 * value);
        }
      } else {
        setBreakLength(value);
        if (!(isWorking || isActive)) {
          setSecondsRemaining(60 * value);
        }
      }
    },
    [isActive, isWorking]
  );

  React.useEffect(() => {
    updateDog();
  }, []);

  React.useEffect(() => {
    if (isActive) {
      countdown();
      interval.current = setInterval(countdown, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [isActive]);

  React.useEffect(() => {
    if (secondsRemaining < 0) {
      updateDog();
      setIsWorking((prev) => !prev);
      setSecondsRemaining((isWorking ? breakLength : workLength) * 60);
    }
  }, [secondsRemaining, isWorking, breakLength, workLength]);

  return (
    <div id="app" className={isWorking ? 'work' : 'break'}>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>🐶 pommoDoggo</h1>
          </div>
          <div className="card-body">
            <Timer seconds={secondsRemaining} />
            <SpeechBubble isActive={isActive} isWorking={isWorking} />
            <Dog dog={dog} />
            <div className="row">
              <Slider
                label="Work length"
                value={workLength}
                onChange={(e) => setLength(e, 'work')}
              />
              <Slider
                label="Break length"
                value={breakLength}
                onChange={(e) => setLength(e, 'break')}
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-4 btn-container">
                <button
                  className={`btn btn-${isActive ? 'danger' : 'primary'}`}
                  onClick={() => setIsActive((prev) => !prev)}
                >
                  {isActive ? (
                    <>
                      <i className="fa-solid fa-stop"></i>
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-play"></i>
                      <span>Start</span>
                    </>
                  )}
                </button>
              </div>
              <div className="col-md-4 btn-container">
                <button className="btn btn-secondary" onClick={updateDog}>
                  <i className="fa-solid fa-bone"></i>
                  <span>Fetch</span>
                </button>
              </div>
              <div className="col-md-4 btn-container">
                <button className="btn btn-outline-secondary" onClick={reset}>
                  <i className="fa-solid fa-rotate"></i>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio src="bark.mp3" />
    </div>
  );
}

export default App;
