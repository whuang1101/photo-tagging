import PokeBall from "../assets/pokeball.png";
import Jumpluff from "../assets/jumpluff.png"
import Snowrunt from "../assets/snorunt.png"
import Mudkip from "../assets/mudkip.png"
import Stopwatch from "./StopWatch";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({PokeBallFound ,JumpluffFound,SnowruntFound,MudkipFound, GameScreen, time, setTime, gameBegin}) => {
    return (
        <header>
            {GameScreen ? <>
            <div className="titles">
                <motion.h1 whileHover={{scale: 1.1}} whileTap = {{scale: .9}} className="home"><Link to="/" style={{textDecoration:"none", color: "white"}}>Pixel Finder </Link></motion.h1>
                <motion.h1 whileHover={{scale: 1.1}} whileTap = {{scale: .9}} className="leader-board"><Link to="/leaderboard" style={{textDecoration:"none", color: "white"}}>Leaderboard</Link></motion.h1>
            </div>
            <Stopwatch PokeBallFound={PokeBallFound} JumpluffFound={JumpluffFound} SnowruntFound={SnowruntFound} MudkipFound={MudkipFound}
            setRealTime={setTime} realTime={time} gameBegin={gameBegin}/>
            <div className="finder">
                <div className="pokeball">
                <img src={PokeBall} alt="pokeball" style={{height:"2em"}}/>
                    {PokeBallFound ?<h3 style={{textDecoration:"line-through"}}>PokeBall</h3>: <h3>Pokeball</h3>}
                </div>
                <div className="jumpluff">
                    <img src={Jumpluff} alt="jumpluff" style={{height:"2em"}}/>
                    {JumpluffFound ?<h3 style={{textDecoration:"line-through"}}>Jumpluff</h3>: <h3>Jumpluff</h3>}
                </div>
                <div className="snorunt">
                    <img src={Snowrunt} alt="snorunt" style={{height:"2em"}}/>
                    {SnowruntFound ?<h3 style={{textDecoration:"line-through"}}>Snorunt</h3>: <h3>Snorunt</h3>}                  
                  
                </div>
                <div className="mudkip">
                    <img src={Mudkip} alt="mudkip" style={{height:"2em"}}/>
                    {MudkipFound ?<h3 style={{textDecoration:"line-through"}}>Mudkip</h3>: <h3>Mudkip</h3>}
                </div>
            </div>
            </>
            :<>
            <motion.h1 whileHover={{scale: 1.1}} whileTap = {{scale: .9}} className="home"><Link to="/" style={{textDecoration:"none", color: "white"}}>Pixel Finder </Link></motion.h1>
            <motion.h1 whileHover={{scale: 1.1}} whileTap = {{scale: .9}} className="leader-board"><Link to="/leaderboard" style={{textDecoration:"none", color: "white"}}>Leaderboard</Link></motion.h1></>}
        </header>
    )
}
export default Header