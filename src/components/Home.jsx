import Header from "./Header";
import "../css/index.css";
import pokemonImage from "../assets/h4cxlfdfgiz81.jpg";
import { useState } from "react";
import { motion } from "framer-motion";
import PokeBall from "../assets/pokeball.png";
import Jumpluff from "../assets/jumpluff.png"
import Snowrunt from "../assets/snorunt.png"
import Mudkip from "../assets/mudkip.png"
const Home = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [dropDown, setDropDown] = useState({ top: 0, left: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [actualCoordinates, setActualCoordinates] = useState({ top: 0, left: 0 });
  // const [coordinatesRange, setCoordinatesRange] = useState({minHeight: 0, maxHeight:0, minWidth: 0, maxWidth: 0});
  const [circlePresent, setCirclePresent] = useState(false);
  const handleCircleClick = () => {
 
  }
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
    console.log(x / imageDimensions.width, y / imageDimensions.height)
    if((range.minWidth< 0.871 && range.maxWidth > 0.871) && (range.minHeight < .7599 && range.maxHeight > .7599)){
      console.log("Found PokeBall")
    }
    
    setCoordinates({ x, y });
  };

  const handleImageLoad = (event) => {
    const image = event.target;
    setImageDimensions({ width: image.width, height: image.height });
  };
  const newTop = (prevTop) => {
   console.log(prevTop)
   const newTop = (200/imageDimensions.height)*100;
   if(prevTop > 67.8){
    return (prevTop-newTop)
   }
   return prevTop
  }

  const newRight = (prevTop) => {
    console.log(prevTop)
    const newTop = (200/imageDimensions.width)*100;
    if(prevTop > 80){
     return (prevTop-newTop)
    }
    return prevTop
   }
  return (
    <>
      <Header />
      <div className="picture" style={{position: "relative", overflow: "hidden"}}>
        <img
          className="actual-picture"
          src={pokemonImage}
          style={{ width: "100vw"}}
          alt="Pokemon Finder"
          onClick={handleImageClick}
          onLoad={handleImageLoad}
        />
        
      { circlePresent &&    
      <>
        <div className="circle" style={{ position: "absolute", top: actualCoordinates.top+ "%", left: actualCoordinates.left + "%", border: "3px dotted black", padding: "30px", transform: "translate(-50%, -50%)", borderRadius:"100%"}} onClick={handleCircleClick}>
          
        </div>
        <motion.div className="dropdown" style={{ position: "absolute", top:newTop(actualCoordinates.top)  + "%",  left: newRight(actualCoordinates.left) + "%", padding:"1em",transform: "translate(25px, 25px)", backgroundColor: "black", color:"white", borderRadius:"1em"}}>
          <ul style={{backgroundColor:"grey", borderRadius:"1em"}}>
          <li className="pokeball" style={{padding:".5em"}}>
                  <img src={PokeBall} alt="pokeball" style={{height:"1em"}}/>
                    <h3>PokeBall</h3>
                </li>
                <li className="jumpluff" style={{padding:".5em"}}>
                    <img src={Jumpluff} alt="jumpluff" style={{height:"1em"}}/>
                    <h3>Jumpluff</h3>
                </li>
                <li className="snorunt" style={{padding:".5em"}}>
                    <img src={Snowrunt} alt="snorunt" style={{height:"1em"}}/>
                    <h3>Snorunt</h3>
                  
                </li>
                <li className="mudkip" style={{padding:".5em"}}>
                    <img src={Mudkip} alt="mudkip" style={{height:"1em"}}/>
                    <h3>Mudkip</h3>

                </li>
          </ul>
        </motion.div>
        </>
        }
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
