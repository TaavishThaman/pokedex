import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import delay from 'delay';
import Loading from "./Loading";

const listStyle = {
    height : "100%",
    minHeight : window.innerHeight,
    paddingLeft : "70px",
    paddingRight : "70px",
    marginTop : "6px",
    backgroundColor : "#F6F0ED",
    paddingBottom : "50px"
};

const cardContainer = {
    display: "grid",
    flexWrap: "wrap",
    gridTemplateColumns: "repeat(3, auto)",
    justifyContent : "space-between",
    paddingLeft : "80px",
    paddingRight : "80px"
};

const inputStyle = {
    width : "400px",
    height : "20px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderWidth : "0px",
    borderRadius : "10px",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop : "20px",
    paddingLeft : "30px",
    backgroundColor : "#cccccc"
};

const inputDiv = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop : "20px",
};

const searchIcon = {
    zIndex : "200",
    height : "14px",
    width : "14px",
    position : "absolute",
    left : "-205px",
    top : "13px"
}

function PokemonList() {
    const [pokemonBaseData, setPokemonBaseData] = useState([]);
    const [pokemonDetailedData, setPokemonDetailedData] = useState([]);
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    async function fetchPokemonData() {
        setLoading(true);
        const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1281`;
        const result = await axios.get(url);
        setPokemonBaseData(result.data.results);
        setLoading(false);
    }

    async function fetchPokemonDetailedData() {
        setLoading(true);
        let promiseData = [];
        for(let i=0; i< pokemonBaseData.length; i++) {
            const url = pokemonBaseData[i].url;
            const result = await axios.get(url);
            promiseData.push(result);
            await delay(0.1);
        }

        setPokemonDetailedData(promiseData);
        setFilteredPokemonData(promiseData);
        setLoading(false);
    }

    function filterList(term) {
        setFilteredPokemonData(pokemonDetailedData.filter(e => e["data"]["name"].includes(term.toLowerCase())))
    }

    useEffect(() => {
        fetchPokemonData();
    }, []);

    useEffect(() => {
        fetchPokemonDetailedData();
    }, [pokemonBaseData]);

    return (
        <div style={listStyle}>
            {!loading ? <div style={inputDiv}>
                <img style={searchIcon} src={require("../assets/search.png")}></img>
                <input 
                    style={inputStyle}
                    type="text" 
                    value={searchTerm} 
                    placeholder="Search a Pokemon"
                    onChange={(e)=>{
                        setSearchTerm(e.target.value);
                        filterList(e.target.value);
                    }}
                />
            </div> : <></>}
            {loading ? <Loading></Loading> : <div style={cardContainer}>
                {filteredPokemonData.map((ele) => {
                    return <PokemonCard id={String(ele["data"]["id"])} name={ele["data"]["name"]} image={ele["data"]["sprites"]["other"]["official-artwork"]["front_default"]} types={ele["data"]["types"]}></PokemonCard>
                })}
            </div>}
        </div>
    );
}

export default PokemonList;