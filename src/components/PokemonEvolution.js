import { useEffect, useState } from "react";
import pokemonImageMap from "../data/pokemon-images";
import PokemonEvolutionCard from "./PokemonEvolutionCard";

const evolutionContainer = {
    textAlign : "center",
    marginTop : "20px",
    marginLeft : "180px",
    marginRight : "180px"
}

const evolutionTitle = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.05em",
    color: "#000000"
};

const evolutionCardsConatiner = {
    display: "grid",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(3, auto)",
    justifyContent : "center",
    marginTop : "30px"
}

function PokemonEvolution (props) {
    const [evolutionData, setEvolutionData] = useState([]);
    function processEvolutionChain(chainData) {
        const pokemonStages = [];
        while(chainData['evolves_to'].length > 0) {
            pokemonStages.push(chainData['species']['name']);
            chainData = chainData['evolves_to'][0];
        }
        pokemonStages.push(chainData['species']['name']);
        console.log(pokemonStages)

        const eData = [];
        pokemonStages.forEach((_ele,idx) => {
            const pokemon = pokemonStages[idx]
            const obj = [pokemon, pokemonImageMap[pokemon]]
            eData.push(obj);
        })
        setEvolutionData(eData);
    }

    useEffect(() => {
        processEvolutionChain(props.data.chain);
    }, [])
    return (
        <div style={evolutionContainer}>
            <div style={evolutionTitle}>Evolution</div>
            <div style={evolutionCardsConatiner}>
                {
                    evolutionData.map(ele => {
                        return <PokemonEvolutionCard cardData={ele}></PokemonEvolutionCard>
                    })
                }
            </div>
        </div>
    );
}

export default PokemonEvolution;