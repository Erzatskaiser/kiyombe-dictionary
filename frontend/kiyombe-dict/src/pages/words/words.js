//Necessary imports 
import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom"
import './words.css'


function Words(props) {

  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  
  //UseEffect
  useEffect(() => {

    // Try to parse the word from the current URL
    let word = location.pathname.split("/")[2]
    if (word){
       // Update props
       props.updateWord(word);
        
       //Query API and set local information
       fetch('http://172.20.3.60:5000/find/'+word)
         .then((res) => res.json())
         .then((response) => 
           {
             // If API returns not found
if (response.noun=="Not found"){
              navigate("/search");
            }
            setData(response)
           })
     }

     // Else go back to search page
     else {
       navigate("/search");
     }
   }, [props.word]);


  //JSX render of the page
  return (
    <div className="canvas_word">
      <div className="navbar_words">
        <div className="site_title_search">
          Kiyom.be
        </div>
      </div>
      <div className="word_result"> 
        {!(data===undefined) && <div className="word">
          {data.noun}
        </div>}
        
        {!(data===undefined) && data.synonym!="nan" && <div className="synonym">
          {data.synonym}
        </div>}

        {!(data===undefined) && <div className="definition">
          {data.definition}
        </div>}
        
        {!(data===undefined) && <div className="examples">
          {data.example1!="nan" && <div className="example">
            <div className="exampleText">
              {data.example1.split(":")[0]}
            </div>
            <div className="exampleTranslation">
              {data.example1.split(":")[1]}
            </div>
          </div>}
          {data.example2!="nan" && <div className="example">
            <div className="exampleText">
              {data.example2.split(":")[0]}
            </div>
            <div className="exampleTranslation">
              {data.example2.split(":")[1]}
            </div>
          </div>}
          {data.example3!="nan" && <div className="example">
            <div className="exampleText">
              {data.example3.split(":")[0]}
            </div>
            <div className="exampleTranslation">
              {data.example3.split(":")[1]}
            </div>
          </div>}
        </div>}
      </div>
    </div>
  );

  

}

export default Words;
