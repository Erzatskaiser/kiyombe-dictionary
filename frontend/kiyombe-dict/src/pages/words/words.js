//Necessary imports 
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import './words.css'

function Words(props) {

  const [data, setData] = useState();
  const navigate = useNavigate();
  
  //UseEffect
  useEffect(() => {
    
    // if there is no word set
    if(!props.word){
      navigate("/search");
    }

    // if there is a word set 
    if(props.word){
      //Query API endpoint to get word data
      fetch('http://172.20.2.178:5000/find/'+props.word)
        .then((res) => res.json())
        .then((response) =>
          {
            setData(response);
            console.log(response)
          }
        )
    }
  }, [props.word]);


  //JSX render of the page
  return (
    <div className="canvas_search">
      <div className="navbar">
        <div className="site_title_search">
          Kiyom.be
        </div>
      </div>
      <div className="word_result">
        
        <div className="word">
          {props.word}
        </div>
        
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
