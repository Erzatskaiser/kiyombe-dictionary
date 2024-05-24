//Necessary impots
import './search.css';

//Output function
function Search() {
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
    </body>
  );
}

export default Search;
