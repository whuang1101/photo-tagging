import PokeBall from "../assets/pokeball.png";
import Jumpluff from "../assets/jumpluff.png"
import Snowrunt from "../assets/snorunt.png"
import Mudkip from "../assets/mudkip.png"
const Header = () => {
    return (
        <header>
            <div className="titles">
                <h1 className="home">Pixel Finder</h1>
                <h1 className="leader-board">Leaderboard</h1>
            </div>
            <div className="finder">
                <div className="pokeball">
                <img src={PokeBall} alt="pokeball" style={{height:"2em"}}/>
                    <h3>PokeBall</h3>
                </div>
                <div className="jumpluff">
                    <img src={Jumpluff} alt="jumpluff" style={{height:"2em"}}/>
                    <h3>Jumpluff</h3>
                </div>
                <div className="snorunt">
                    <img src={Snowrunt} alt="snorunt" style={{height:"2em"}}/>
                    <h3>Snorunt</h3>
                  
                </div>
                <div className="mudkip">
                    <img src={Mudkip} alt="mudkip" style={{height:"2em"}}/>
                    <h3>Mudkip</h3>

                </div>
            </div>
        </header>
    )
}
export default Header