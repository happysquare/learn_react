import './App.css';
import {useState} from 'react'

function MyButton({count, onClick}){

  return (
    <button onClick={onClick}>
        Clicked {count} times
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count +1);
  }

  return(
    <div>
      <h3>These buttons count together</h3>
    <MyButton onClick={handleClick} count={count}/>
    <MyButton onClick={handleClick} count={count}/>
    </div>
  );
}

export default App;
