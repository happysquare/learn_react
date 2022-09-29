import './App.css';
import {useState} from 'react'

function MyButton(){
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count +1);
  }

  return (
    <button onClick={handleClick} >
        Clicked {count} times
    </button>
  );
}

function App() {
  return(
    <div>
      <h3>These buttons count independantly</h3>
    <MyButton />
    <MyButton />
    </div>
  );
}

export default App;
