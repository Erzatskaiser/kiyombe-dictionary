//Necessary imports 
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

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
      fetch('http://172.20.10.2:5000/find/'+props.word)
        .then((res) => res.json())
        .then((response) =>
          {
            setData(response);
          }
        )
    }
  }, [props.word]);
  

  //JSX render of the page

  

}

export default Words;
