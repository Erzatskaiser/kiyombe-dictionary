//Page imports 
import Home from "./pages/home/home.js";

//Module imports 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Seach button function 
//route to search page

//Be surprised load 
// new def page, with random word

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
