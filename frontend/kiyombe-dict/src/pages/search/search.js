//Necessary impots
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './search.css';

//Output function
function Search(props) {
  
  //Initialize navigator
  const navigate = useNavigate();

  //Initialize variables to be displayed
  const [wordsFound, setWordsFound] = useState('');

  //Handle switching to the search page
  const handleSearch = (event) => {

    //Preent default form submission
    event.preventDefault();

    //Push to history
    navigate("/search");
  }

  
  //Asynchronous function
  //Search for matching terms
  async function handleChange(event) {
    
    //user input
    var input = event.target.value;

    //initialize results holder
    let results;

    //craft the url to query 
    var url = 'http://172.20.2.178:5000/rfind/'+input;

    //if user has not entered anything
    if(input.trim()==''){
      setWordsFound("")
    }

    
    else {
      //send the request
      const response = await fetch(url).then(function(response) {
        return response.text();
      }).then(function(data) {

      // split all words into array
      results = data.split(" ");

      //Update words found variables
      setWordsFound(results);
      }) 
    }
  }
  
  // Update props to reflect user selected courses
  function goToSelect(word) {
    // Update the prop
    props.updateWord(word)

    // Navigate to page
    var path = "/words/"+word.trim()
    navigate(path)
  }

  //Define search Output
  let arrayWordItems = ""
  
  //if there are words found
  if(Boolean(wordsFound)){
    arrayWordItems = wordsFound.map((word) => <li className="search_result" 
      onClick={(event)=> {
        event.preventDefault();
        goToSelect(word);
      }}>{word}</li>);
  }

  //if there are no words found
  else{

    //keep in blank
    arrayWordItems = ""
  }
  
  return (
    <body className="canvas_search">
      <div className="navbar">
        <div className="site_title_search">
 	        Kiyom.be
        </div>
      </div>
      <div className="search_body">
        <div className="search_box">
          <input type="text" className="searched_word" placeholder ="Cherchez un mot"
          onChange={handleChange} />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>  
      </div>
      <div className="search_results">
        <ul className="search_list">{arrayWordItems}</ul>
      </div>
      <div className="search_buttons">
	      <button className="search_button" onClick={handleSearch}>Cherchez un mot</button>
        <div className="divider1"/>
        <button className="search_button">Soyez surpris</button>
      </div>
    </body>
  );
}

export default Search;
