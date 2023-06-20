import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import delay from 'delay';
import Loading from "./Loading";
import imgMap from "../data/icons";

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

const filterContainer = {
    position : "relative"
}

const filterCount = {
    background: "#EF3E33",
    height : "17px",
    width : "17px",
    borderRadius : "8.5px",
    position: "absolute",
    zIndex : "100",
    top : "15px",
    left : "80px"
}

const filterCountText = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top : "8px",
    color : "#fff",
    fontSize : "10px",
    fontFamily : "Roboto"
}

const filterImg = {
    height : "22px",
    width : "22px",
    display : "inline-block",
    position: "absolute",
    top: "20px",
    zIndex: "20",
    cursor : "pointer"
}

const filterCard = {
    position : "absolute",
    width : "1000px",
    height : "300px",
    backgroundColor : "#F6F0ED",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginTop : "150px",
    zIndex : "100",
    borderRadius : "20px"
}

const regionContainer = {
    display : "flex",
    marginLeft : "100px",
    marginRight : "100px",
    overflowX : "scroll",
    marginTop : "10px",
    marginBottom : "15px"
}

const regionStyle = {
    width : "83px",
    height : "20px",
    backgroundColor : "#cccccc",
    borderRadius : "4px",
    marginLeft : "19px",
    marginRight : "19px",
    padding : "2px 8px",
    fontSize : "16px",
    cursor : "pointer"
}

const regionText = {
    fontFamily : "Roboto",
    fontSize : "16px",
    fontWeight : "300px",
    lineHeight : "19px",
    textAlign : "center",
    marginBottom : "5px",
    fontStyle : "normal",
    marginRight : "15px"
}

const typeContainer = {
    display : "flex",
    marginLeft : "100px",
    marginRight : "100px",
    overflowX : "scroll",
    marginTop : "10px",
    marginBottom : "15px"
}

const typeStyle = {
    width : "100px",
    height : "20px",
    borderRadius : "4px",
    marginLeft : "19px",
    marginRight : "19px",
    padding : "2px 8px",
    fontSize : "16px",
    backgroundColor : "#cccccc",
    position : "relative",
    cursor : "pointer"
}

const typeText = {
    fontFamily : "Roboto",
    fontSize : "16px",
    fontWeight : "300px",
    lineHeight : "19px",
    textAlign : "center",
    marginBottom : "5px",
    fontStyle : "normal",
    color : '#fff',
    marginLeft : "15px",
    marginRight : "15px"
}

const typeBackgrounds = {
    'bug' : '#92BC2C',
    'dark' : '#595761',
    'dragon' : '#0C69C8',
    'electric' : '#F2D94E',
    'fairy' : '#EE90E6',
    'fighting' : '#D3425F',
    'fire' : '#FBA54C',
    'flying' : '#A1BBEC',
    'ghost' : '#5F6DBC',
    'grass' : '#5FBD58',
    'ground' : '#DA7C4D',
    'ice' : '#75D0C1',
    'normal' : '#A0A29F',
    'poison' : '#B763CF',
    'psychic' : '#FA8581',
    'rock' : '#C9BB8A',
    'steel' : '#5695A3',
    'water' : '#539DDF'
};

const filterText = {
    fontFamily : "Roboto",
    fontSize : "18px",
    fontWeight : "500px",
    lineHeight : "21px",
    textAlign : "center",
    marginBottom : "10px",
    fontStyle : "normal",
    marginTop : "10px"
};

const iconStyle = {
    position : "absolute",
    width : "20px",
    height : "20px",
    left : "2px",
    top : "3px"
};
const crossBtn = {
    position : "absolute",
    width : "15px",
    height : "15px",
    right : "2px",
    top : "7px",
    fontSize : "10px",
    cursor : "pointer"
}

const btnContainer = {
    marginLeft : "100px",
    marginRight : "100px",
    marginTop : "10px",
    marginBottom : "15px"
}

const applyBtn = {
    width : "68px",
    height : "22px",
    textAlign : "center",
    backgroundColor : "#EF3E33",
    marginLeft : "auto",
    marginRight : "auto",
    marginTop : "40px",
    borderRadius : "12px",
    color : "#fff",
    cursor : "pointer"
}

function PokemonList() {
    const [pokemonBaseData, setPokemonBaseData] = useState([]);
    const [pokemonDetailedData, setPokemonDetailedData] = useState([]);
    const [filteredPokemonData, setFilteredPokemonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [regionData, setRegionData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [activeFilters, setActiveFilters] = useState({type : [], region : []});
    const [activeDisplayFilters, setActiveDisplayFilters] = useState([]);

    async function fetchPokemonData() {
        setLoading(true);
        const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=500`;
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

    async function fetchRegionData() {
        const url = 'https://pokeapi.co/api/v2/region';
        const result = await axios.get(url);
        setRegionData(result.data.results);
    }

    async function fetchTypesData() {
        const url = 'https://pokeapi.co/api/v2/type';
        const result = await axios.get(url);
        setTypeData(result.data.results);
    }

    function filterList(term) {
        setFilteredPokemonData(pokemonDetailedData.filter(e => e["data"]["name"].includes(term.toLowerCase())))
    }

    function addTypeFilter(type) {
        if(activeFilters['type'].includes(type) === false) {
            activeFilters['type'].push(type);
            setActiveFilters({type : [...activeFilters['type']], region : [...activeFilters['region']]});
            setActiveDisplayFilters([...activeFilters['type'], ...activeFilters['region']]);
        }
    }  
    
    function addRegionFilter(region) {
        if(activeFilters['region'].includes(region) === false) {
            activeFilters['region'].push(region);
            setActiveFilters({type : [...activeFilters['type']], region : [...activeFilters['region']]});
            setActiveDisplayFilters([...activeFilters['type'], ...activeFilters['region']]);
        }
    }

    function removeFilter(name, key) {
        activeFilters[key] = activeFilters[key].filter(e => e !== name)
        setActiveFilters({type : [...activeFilters['type']], region : [...activeFilters['region']]});
        setActiveDisplayFilters([...activeFilters['type'], ...activeFilters['region']]);
        // applyFilters();
    }

    function applyFilters() {
        if(activeFilters['type'].length > 0) {
            let newData = [];
            setFilteredPokemonData(pokemonDetailedData);
            const types = activeFilters['type'].sort();
            let arr = [];
            if(types.length === 1) {
                pokemonDetailedData.map((ele, idx) => {
                    const typeArr = ele.data.types.map(e => e.type.name);
                    if(typeArr.includes(types[0])) {
                        arr.push(idx);
                    }
                });
                setFilteredPokemonData(pokemonDetailedData.filter((ele, idx) => arr.includes(idx)));
            } else {
                pokemonDetailedData.map((ele, idx) => {
                    const typeArr = ele.data.types.map(e => e.type.name).sort();
                    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                    if(isEqual(typeArr, types)) {
                        arr.push(idx);
                    }
                });
                setFilteredPokemonData(pokemonDetailedData.filter((ele, idx) => arr.includes(idx)));
            }
        } else {
            setFilteredPokemonData(pokemonDetailedData);
        }
    }

    useEffect(() => {
        fetchPokemonData();
    }, []);

    useEffect(() => {
        fetchPokemonDetailedData();
    }, [pokemonBaseData]);

    useEffect(() => {
        fetchRegionData();
    }, [])

    useEffect(() => {
        fetchTypesData();
    }, [])

    return (
        <div style={listStyle}>
            <div onClick={() => {setShowFilters(!showFilters)}}>
                {activeDisplayFilters.length > 0 ? <div style={filterCount}>
                    <div style={filterCountText}>{activeDisplayFilters.length}</div>
                </div> : <></>}
                <img style={filterImg} src={require('../assets/filter.png')}></img>
            </div>
            {showFilters ? <div style={filterContainer}>
                <div style={filterCard}>
                    <div style={filterText}>Filters</div>
                    <div style={typeContainer}>
                        {
                            activeDisplayFilters ? activeDisplayFilters.map(ele => {
                                return <div onClick={(e) => {
                                    
                                }} 
                                style={Object.keys(typeBackgrounds).includes(ele) ? Object.assign({}, typeStyle, typeBackgrounds[ele] ? {backgroundColor : typeBackgrounds[ele]} : {}) : typeStyle}>
                                    {Object.keys(typeBackgrounds).includes(ele) ? 
                                    <span>
                                        <img style={iconStyle} src={imgMap[ele]}></img>
                                        <span style={typeText}>{ele}</span>
                                        <div onClick={() => {
                                            removeFilter(ele, "type")
                                        }}
                                        style={Object.assign({}, crossBtn, Object.keys(typeBackgrounds).includes(ele) ? {color : '#fff'} : {color : "#000"})}>X</div>
                                    </span> : <span>
                                    <span style={regionText}>{ele}</span>
                                        <div onClick={() => {
                                            removeFilter(ele, "region")
                                        }}
                                        style={Object.assign({}, crossBtn, Object.keys(typeBackgrounds).includes(ele) ? {color : '#fff'} : {color : "#000"})}>X</div>
                                    </span>}
                                </div>
                            }) : <div>Loading...</div>
                        }
                    </div>
                    <div style={filterText}>Types</div>
                    <div style={typeContainer}>
                        {
                            typeData ? typeData.map(ele => {
                                return <div onClick={(e) => {
                                    addTypeFilter(ele.name);
                                }} 
                                style={Object.assign({}, typeStyle, typeBackgrounds[ele.name] ? {backgroundColor : typeBackgrounds[ele.name]} : {})}>{
                                    <span>
                                        <img style={iconStyle} src={imgMap[ele.name]}></img>
                                        <span style={typeText}>{ele.name}</span>
                                    </span>
                                }</div>
                            }) : <div>Loading...</div>
                        }
                    </div>
                    <div style={filterText}>Regions</div>
                    <div style={regionContainer}>
                        {
                            regionData ? regionData.map(ele => {
                                return <div onClick={(e) => {
                                    addRegionFilter(ele.name);
                                }}
                                style={regionStyle}>
                                    <span style={regionText}>{ele.name}</span>
                                </div>
                            }) : <div>Loading...</div>
                        }
                    </div>
                    <div style={btnContainer}>
                        <div style={applyBtn} onClick={() => {
                            applyFilters();
                        }}>Apply</div>
                    </div>
                </div>
            </div> : <div></div>}
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
                    return <PokemonCard 
                        id={String(ele["data"]["id"])} 
                        name={ele["data"]["name"]} 
                        image={ele["data"]["sprites"]["other"]["official-artwork"]["front_default"]} 
                        types={ele["data"]["types"]} 
                        info={ele["data"]}
                    ></PokemonCard>
                })}
            </div>}
        </div>
    );
}

export default PokemonList;