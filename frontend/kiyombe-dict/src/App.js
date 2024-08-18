//Page imports 
import Home from "./pages/home/home.js";
import Search from "./pages/search/search.js";
import Words from "./pages/words/words.js" 

//Module imports 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react"

//Seach button function 
//route to search page

//Be surprised load 
// new def page, with random word

function App() {
  
  //Vars to store words
  const [word, setWord] = useState();

  //Update the word Vars
  function handleWordUpdate(data){
    setWord(data);
  }

  //JSX to return
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/search" element={<Search updateWord={handleWordUpdate}/>} />
        <Route path="/words/:word" element={<Words word={word} updateWord={handleWordUpdate}/>} />
      </Routes>
    </Router>
  );
}

export default App;
