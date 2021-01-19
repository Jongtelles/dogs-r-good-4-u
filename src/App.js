import { useState, useEffect, useRef } from "react";
import "./App.css";
import shaner from "./assets/shane.png";
import DogImage from "./components/DogImage";
import Footer from "./components/Footer";
import useInterval from "./hooks/useInterval";
import useTrait from "./hooks/useTrait";
import { tricks as trickList } from "./tricks";

function App() {
  const [dog, setDog] = useState(shaner);
  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(false);
  const tricks = useTrait(trickList);
  const trick = useTrait(
    trickList[Math.floor(Math.random() * trickList.length)]
  );
  const [tricking, setTricking] = useState(false);
  const selectRef = useRef();

  useEffect(() => {
    console.log("🐶🐕​​🐶​🐩​🐶");
  }, []);

  useInterval(
    () => {
      fetchDog();
    },
    isRunning ? delay : null
  );

  const handleTricks = () => {
    if (tricks.get().length === 0) {
      tricks.set(trickList);
      trick.set(trickList[Math.floor(Math.random() * trickList.length)]);
    }

    setTricking(true);
    setTimeout(() => {
      setTricking(false);
      const newTricks = tricks.get().filter(item => item !== trick.get());
      tricks.set(newTricks);
      const newTrick = newTricks[Math.floor(Math.random() * newTricks.length)];
      trick.set(newTrick);
    }, 3000);
  };

  const fetchDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(data => data.json())
      .then(data => setDog(data.message));
  };

  return (
    <div className='App'>
      <h1>Dogs R Good 4 U</h1>
      <p>Your source of neverending virtual dog friends</p>
      <DogImage src={dog} trick={trick.get()} tricking={tricking} />
      <div className='dog-btn-container'>
        {tricking ? <p className='dog-trick'>{trick.get()}</p> : ""}
        <button className='dog-btn' onClick={() => fetchDog()}>
          Fetch New Dog
        </button>
        <button
          disabled={tricking}
          className='dog-btn'
          onClick={() => {
            handleTricks();
          }}
        >
          {tricking
            ? "Performing! 🐕"
            : tricks.get().length === 0
            ? "I don't know anymore tricks, start over?"
            : "Do A Trick!"}
        </button>
        <button
          className='dog-btn'
          onClick={() => setIsRunning(isRunning ? false : true)}
        >
          {isRunning ? "Stop" : "Show Me Random Dogs"}
        </button>
        <div className='dog-select-container'>
          <label>
            See a dog every
            <select
              ref={selectRef}
              name=''
              id=''
              onChange={e => {
                setDelay(e.target.value);
              }}
            >
              <option value={2000}>2</option>
              <option value={3000}>3</option>
              <option value={5000}>5</option>
            </select>
            seconds
          </label>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
