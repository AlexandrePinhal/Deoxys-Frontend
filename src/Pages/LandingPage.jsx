import "../Style/landingPage.css";
import LoopGif from "../Components/LoopGif";
import {useState, useEffect} from "react"

function LandingPage() {

  const [loop, setLoop] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
        setLoop(false)
        document.getElementById('landingPage').className = "landingPage"
    }, 4200);
  }, [])
    
  return (
    <div className="landingPageLoop" id='landingPage'>
      {loop ? <LoopGif /> : 
      <div className="mottoWrapper">
        <h1>Negosud, le meilleur du vin selectionné pour vous.</h1>
      </div>
      }
    </div>
  );
}

export default LandingPage;