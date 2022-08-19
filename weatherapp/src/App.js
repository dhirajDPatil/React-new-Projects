import WeatherInfo from "./Component/WeatherInfo";
import './App.css'
import { useState } from "react";
function App() {
  const [wbtn, setWbtn] = useState(false);
  const toggleStateButton = () => {
    wbtn? setWbtn(false) : setWbtn(true)
  }
  return (
    <>
    <button onClick={toggleStateButton}>{wbtn? <>Weather info Hide</> : <>Weather info Show</>}</button>
      <div className="App">
        {wbtn && <WeatherInfo/>}
      </div>
    </>
  );
}

export default App;
