//Necessary impots
import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css';

//Output function
function Home(props) {
  
  //Initiaze navigator
  const navigate = useNavigate();

  //Handle switching to the search page
  const handleSearch = (event) => {

    //Prevent default form submission
    event.preventDefault();
    
    //Push to history
    navigate("/search");

  }

  return (
    <body className="canvas">
      <div className="navbar">
        <div className="site_title_main">
          Kiyom.be
        </div>
      </div>
      <div className="intro">
        <h2 className="intro_text_main">
          Apprenez le Kiyombe,
        </h2>
        <h2 className="intro_text_secondary">
          un mot à la fois
        </h2>
      </div>
      <div className="intro_buttons">
        <button className="intro_button" onClick={handleSearch}>Cherchez un mot</button>
        <div className="divider1"/>
        <button className="intro_button">Soyez surpris</button>
      </div>
    </body>
  );
}

export default Home;
