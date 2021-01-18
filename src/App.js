import { useState, useEffect } from "react";
import "./App.css";
import DogImage from "./components/DogImage";
import useInterval from "./hooks/useInterval";

function App() {
  const [dog, setDog] = useState(null);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetchDog();
  }, []);

  useInterval(
    () => {
      fetchDog();
    },
    isRunning ? delay : null
  );

  const fetchDog = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(data => data.json())
      .then(data => setDog(data.message));
  };

  return (
    <div className='App'>
      <h1>Dogs R Good 4 U</h1>
      <DogImage src={dog} txt={dog ? "Arf!" : "Fetching..."} />
      <button className='dog-btn' onClick={() => fetchDog()}>
        Fetch New Dog
      </button>

      <button
        className='dog-btn'
        onClick={() => setIsRunning(isRunning ? false : true)}
      >
        Random Dogs
      </button>
      <label>
        See a dog every
        <select name='' id=''>
          <option value={1000}>1</option>
        </select>
        second{}
      </label>
      <button className='dog-btn' onClick={() => setDelay(100)}>
        Update frequency
      </button>
    </div>
  );
}

export default App;
