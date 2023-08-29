import Header from "./Header"
import "../css/leaderboard.css"
import { useEffect, useState } from "react"
const Leaderboard = () => {
    const [allData, setAllData] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const apiUrl = `https://photo-tagging-serverside-production.up.railway.app/leaderboard`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            setAllData(data)
            setLoading(false);
    }
        fetchLeaderBoard()},[])
    const fixDate = (date) => {
        const newDate = date.slice(0,10);
        const [year, month, day] = newDate.split("-");
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const returnDate = months[month-1]+ " " + day + ", " + year;
        return returnDate
    }
    return (
        <>
        <div className="leaderboard-background">
            <Header />  
            <div className="leaderboard-container">
                {!loading ?
            <table>
                <thead>
                    <tr>
                        <th className="rank">Rank</th>
                        <th className="name">Name</th>
                        <th className="time">Time (s)</th>
                        <th className="date">Date</th>
                    </tr>
                </thead>
                <tbody>
                { allData && allData.map((item, index)=> {
                    return(
                    <tr key={item._id}>
                        {index < 3 ? <>
                        <td className="rank" style={{color:"red"}}>{index+1}</td>
                        <td className="name"  style={{color:"red"}}>{item.name}</td>
                        <td className="time" style={{color:"red"}}>{item.time}</td>
                        <td className="date" style={{color:"red"}}>{fixDate(item.date)}</td>
                        </>: <><td className="rank">{index+1}</td>
                         <td className="name">{item.name}</td>
                         <td className="time">{item.time}</td>
                        <td className="date">{fixDate(item.date)}</td>
                         </>}

                    </tr>
                    )
                })}
                </tbody>
            </table>
            :
            <div className="loading" style={{color:"white"}}>Loading</div>
                }
            </div>
        </div>
        </>
        )
}

export default Leaderboard