import Header from "./Header";
import "../css/index.css";
import pokemonImage from "../assets/h4cxlfdfgiz81.jpg";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PokeBall from "../assets/pokeball.png";
import Jumpluff from "../assets/jumpluff.png"
import Snowrunt from "../assets/snorunt.png"
import Mudkip from "../assets/mudkip.png"
import Location from "../assets/location.png"
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dropDown, setDropDown] = useState({ top: 0, left: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [actualCoordinates, setActualCoordinates] = useState({ top: 0, left: 0 });
  const [range, setRange] = useState({})
  const [foundPokeball, setFoundPokeball] = useState(false);
  const [pokeballCoordinates, setPokeballCoordinates] = useState();
  const [foundJumpluff, setFoundJumpluff] = useState(false);
  const [jumpluffCoordinates, setJumpluffCoordinates] = useState();
  const [foundSnorunt, setFoundSnorunt] = useState(false);
  const [snoruntCoordinates, setSnoruntCoordinates] = useState();
  const [foundMudkip, setFoundMudkip] = useState(false);
  const [mudkipCoordinates, setMudkipCoordinates] = useState();
  const [gameEnd, setGameEnd] = useState(false);
  const [time, setTime] = useState(0);
  const [gameBegin, setGameBegin] = useState(true);
  const [name, setName] = useState("");
  const [circlePresent, setCirclePresent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(foundJumpluff && foundMudkip && foundPokeball && foundSnorunt){
      setGameEnd(true);
    }
  },[foundJumpluff,foundMudkip,foundPokeball,foundSnorunt])

  // make sure that the clicks work across different displays
  const handleImageClick = (event) => {
    const image = event.target;
    const imageRect = image.getBoundingClientRect();
    setCirclePresent(!circlePresent);
    const x = event.clientX - imageRect.left;
    const y = event.clientY - imageRect.top;
    setActualCoordinates({ top: (y / imageDimensions.height) * 100, left: (x / imageDimensions.width) * 100 });
    const range = {
      minHeight: (y-30) / imageDimensions.height,
      maxHeight:(y+30) / imageDimensions.height,
      minWidth: (x-30) / imageDimensions.width,
      maxWidth: (x+30) / imageDimensions.width,
    }
    setRange(range); 
    setCoordinates({ x, y });
  };

  const handleImageLoad = (event) => {
    const image = event.target;
    setImageDimensions({ width: image.width, height: image.height });
  };

  // if popup rectangle goes past VH/VW it will be given a new top/left
  const newTop = (prevTop) => {
   const newTop = (200/imageDimensions.height)*100;
   if(prevTop > 67.8){
    return (prevTop-newTop)
   }
   return prevTop
  }

  const newRight = (prevTop) => {
    const newTop = (200/imageDimensions.width)*100;
    if(prevTop > 80){
     return (prevTop-newTop)
    }
    return prevTop
   }

   // find Pokemon and verify with backend if coordinates are right
  const find = (name) => {
    const fetchCoordinates = async() => {
      const apiUrl = `https://photo-tagging-serverside-production.up.railway.app/character/${name}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          validatePokemon(data, name);
    }
    fetchCoordinates()
  }

  // validate with backend to see if the pokemon is indeed there
  const validatePokemon = (requiredCoordinates, name) => {
    if((range.minWidth< requiredCoordinates.x && range.maxWidth > requiredCoordinates.x) && (range.minHeight < requiredCoordinates.y && range.maxHeight > requiredCoordinates.y)){
        if(name === "Pokeball")
        {console.log("Found PokeBall")
        setFoundPokeball(true);
        setPokeballCoordinates({x:requiredCoordinates.x, y:requiredCoordinates.y})}
        else if(name === "Jumpluff"){
          console.log("Found Jumpluff");
          setFoundJumpluff(true);
          setJumpluffCoordinates({x:requiredCoordinates.x, y:requiredCoordinates.y})
        }
        else if(name === "Snorunt"){
          console.log("Found Snorunt");
          setFoundSnorunt(true);
          setSnoruntCoordinates({x:requiredCoordinates.x, y:requiredCoordinates.y})
        }
        else if(name === "Mudkip") {
          console.log("Found Mudkip");
          setFoundMudkip(true);
          setMudkipCoordinates({x:requiredCoordinates.x, y:requiredCoordinates.y})
        }

    }
    setCirclePresent(false);
  }
  // Form to submit and update leaderboard backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const post = {
      name: name,
      time: time,
      date: new Date()
    };
  
    try {
      const response = await fetch("https://photo-tagging-serverside-production.up.railway.app/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
      });
      console.log()
      if (response.status) {
        console.log("hi")
        navigate("/leaderboard");
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  

  const handleGameBegin = () => {
    setGameBegin(!gameBegin);
  }
  return (
    <>
      <Header PokeBallFound={foundPokeball} JumpluffFound={foundJumpluff} SnowruntFound={foundSnorunt} MudkipFound={foundMudkip} GameScreen={true}
      time={time} setTime={setTime} gameBegin = {gameBegin}/>
      <div className="picture" style={{position: "relative", overflow: "hidden"}}>
        <img
          className="actual-picture"
          src={pokemonImage}
          style={{ width: "100vw"}}
          alt="Pokemon Finder"
          onClick={handleImageClick}
          onLoad={handleImageLoad}
        />
        {gameBegin && <>
        <motion.div
          className="start-background"
          initial={{ opacity: 0 }} 
          animate={{ opacity: .95 }} 
          transition={{ duration: 1 }} 
        ></motion.div>      
        <motion.div className="begin-game"
        initial={{y:"-100vh",x:"-50%"}}
        animate={{y:"30vh", x:"-50%"}}
        transition={{
          type: "spring",
          duration: 1,    
          stiffness: 100, 
          damping: 10    
        }}>
          <p>Welcome to Pixel Finder where you will be looking for the items on the top right!</p>
          <p>When you think you found the item click on it and a drop down will appear. There you will be able to pick the one you found.</p>
          <p>Good luck finding them all!!</p>
          <input type="submit" value="Start Game!" className="submit" onClick={() => {handleGameBegin()}} />
        </motion.div>
      </>}
      {gameEnd && <>
        <motion.div
          className="endgame-background"
          initial={{ opacity: 0 }} 
          animate={{ opacity: .8 }} 
          transition={{ duration: 1 }} 
        ></motion.div>      
        <motion.div className="endgame"
        initial={{y:"-100vh",x:"-50%"}}
        animate={{y:"50vh", x:"-50%"}}
        transition={{
          type: "spring",
          duration: 1,    
          stiffness: 100, 
          damping: 10    
        }}>
          <p>Congratulations! You beat the game with a time of {time} seconds!</p>
          <form onSubmit={(e) => {handleFormSubmit(e)}}>
          <label htmlFor="Username">Username:</label>
            <input type="text" id="Username" name="Username" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="submit" className="submit"/>
          </form>
        </motion.div>
      </>}
      { circlePresent &&    
      <>
        <div className="circle" style={{ position: "absolute", top: actualCoordinates.top+ "%", left: actualCoordinates.left + "%", border: "3px dotted black", padding: "30px", transform: "translate(-50%, -50%)", borderRadius:"100%"}}>
          
        </div>
        <motion.div className="dropdown" style={{ position: "absolute", top:newTop(actualCoordinates.top)  + "%",  left: newRight(actualCoordinates.left) + "%", padding:"1em",transform: "translate(25px, 25px)", backgroundColor: "black", color:"white", borderRadius:"1em"}}>
          <ul style={{backgroundColor:"grey", borderRadius:"1em"}}>
          <li className="pokeball" style={{padding:".5em"}} onClick={(e) => find("Pokeball")}>
                  <img src={PokeBall} alt="pokeball" style={{height:"1em"}}/>

                    {foundPokeball ?<h3 style={{textDecoration:"line-through"}}>PokeBall</h3>: <h3>Pokeball</h3>}
                </li>
                <li className="jumpluff" style={{padding:".5em"}} onClick={(e) => find("Jumpluff")}>
                    <img src={Jumpluff} alt="jumpluff" style={{height:"1em"}}/>
                    {foundJumpluff ?<h3 style={{textDecoration:"line-through"}}>Jumpluff</h3>: <h3>Jumpluff</h3>}
                </li>
                <li className="snorunt" style={{padding:".5em"}} onClick={(e) => find("Snorunt")}>
                    <img src={Snowrunt} alt="snorunt" style={{height:"1em"}}/>
                    {foundSnorunt ?<h3 style={{textDecoration:"line-through"}}>Snorunt</h3>: <h3>Snorunt</h3>}                  
                </li>
                <li className="mudkip" style={{padding:".5em"}} onClick={(e) => find("Mudkip")}>
                    <img src={Mudkip} alt="mudkip" style={{height:"1em"}}/>
                    {foundMudkip ?<h3 style={{textDecoration:"line-through"}}>Mudkip</h3>: <h3>Mudkip</h3>}                </li>
          </ul>
        </motion.div>
        </> 
        }
        {foundPokeball && <img src={Location} style={{ position: "absolute", top:(pokeballCoordinates.y * 100)  + "%",  left: (pokeballCoordinates.x * 100)+ "%",height:"2em", transform:"translateY(-50%)"}}/>}
        {foundJumpluff && <img src={Location} style={{ position: "absolute", top:(jumpluffCoordinates.y * 100)  + "%",  left: (jumpluffCoordinates.x * 100)+ "%",height:"2em" , transform:"translateY(-50%)"}}/>}
        {foundSnorunt && <img src={Location} style={{ position: "absolute", top:(snoruntCoordinates.y * 100)  + "%",  left: (snoruntCoordinates.x * 100)+ "%",height:"2em" , transform:"translateY(-50%)"}}/>}
        {foundMudkip && <img src={Location} style={{ position: "absolute", top:(mudkipCoordinates.y * 100)  + "%",  left: (mudkipCoordinates.x * 100)+ "%",height:"2em" , transform:"translateY(-50%)"}}/>}

      </div>
      {/* <div>
        <p>Image Dimensions: {imageDimensions.width} x {imageDimensions.height}</p>
        <p>Clicked Pixel: {coordinates.x}, {coordinates.y}</p>
        <p>Corrected Pixels: X {actualCoordinates.left}, Y {actualCoordinates.top}</p>
      </div> */}
    </>
  );
};

export default Home;
