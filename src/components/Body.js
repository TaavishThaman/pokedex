import HomeCard from "./HomeCard";
import { BrowserRouter, Route, Link } from "react-router-dom";

const bodyStyle = {
    height : window.innerHeight,
    paddingLeft : "50px",
    paddingRight : "50px",
    marginTop : "6px",
    backgroundColor : "#F6F0ED",
}

const cardContainer = {
    display: "grid",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(3, auto)",
    justifyContent : "space-between",
    "@media (maxWidth: 850px) and (minWidth: 400px)": {
        gridTemplateColumns: "repeat(1, auto)",
    }
}

const cardNames = ["Pokemon", "Items", "Moves", "Your Team"]

const cardImages = [require('../assets/bulbasaur.png'), 
    require('../assets/pokeballs.png'), 
    require('../assets/explosion.png'), 
    require('../assets/team.png')]

function Body() {
    return (
        <div style={bodyStyle}>
            <div style={cardContainer}>
                <Link to="/pokedex">
                    <HomeCard title={cardNames[0]} image={cardImages[0]}></HomeCard>
                </Link>
                <HomeCard title={cardNames[1]} image={cardImages[1]}></HomeCard>
                <HomeCard title={cardNames[2]} image={cardImages[2]}></HomeCard>
                <HomeCard title={cardNames[3]} image={cardImages[3]}></HomeCard>
            </div>
        </div>
    );
}

export default Body;