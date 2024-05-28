//Necessary impots
import { useNavigate } from "react-router-dom";
import './search.css';

//Output function
function Search() {
  
  //Initialize navigator
  const navigate = useNavigate();

  //Handle switching to the search page
  const handleSearch = (event) => {

    //Preent default form submission
    event.preventDefault();

    //Push to history
    navigate("/search");
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
          <input type="text" className="searched_word"/>
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>  
      </div>
      <div className="search_results">
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
