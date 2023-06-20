import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import imgMap from "../data/icons";
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import PokemonEvolution from "../components/PokemonEvolution";

const bodyContainer = {
    paddingLeft : "100px",
    paddingRight : "100px",
    paddingTop : "5px",
    backgroundColor : "#F6F0ED",
    height : "100%"
}

const topContainer = {
    marginLeft : "100px",
    marginRight : "100px",
    display : "flex",
    justifyContent : "space-between",
    textAlign: "center"
}

const imgContainer = {
    height : "500px",
    position : "relative"
}

const descContainer = {
    height : "500px"
}

const dayImg = {
    height : "500px",
    width : "500px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRadius : "20px"
}

const pokemonImg = {
    height : "260px",
    width : "260px",
    position : "absolute",
    left: "0px",
    right : "0px",
    marginLeft: "auto",
    marginRight: "auto",
    top : "161px"
}

const descriptionBox = {
    height : "145px",
    width : "400px",
    borderRadius : "20px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor : "#F6F0ED",
    textAlign : "center"
}

const descriptionTitle = {
    fontFamily : "Roboto",
    fontSize : "24px",
    lineHeight : "28px",
    fontWeight : "700",
    letterSpacing: "0.05em",
    paddingTop : "20px"
}

const descriptionText = {
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    marginTop : "20px",
    marginLeft : "44px",
    marginRight : "44px"
}

const infoBox = {
    width : "400px",
    height : "244px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#F6F0ED",
    borderRadius : "20px",
    marginTop : "100px"
}

const infoTitle = {
    fontFamily : "Roboto",
    fontSize : "24px",
    lineHeight : "28px",
    fontWeight : "700",
    letterSpacing: "0.05em",
    paddingTop : "20px"
}

const infoContainer = {
    display : 'flex',
    flexWrap: 'wrap',
    marginTop : "30px",
    paddingLeft : '10px',
    paddingRight : '10px'
}

const infoRow = {
    flex: "50%"
}

const infoAttrTitle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.05em'
}

const infoAttr = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.05em',
    marginTop : '10px',
    marginBottom : '30px'
}

const imageContainer = {
    width : "100px",
    height : "30px",
    top : "78px",
    position : "absolute",
    left : "210px"
};

const typeIcon = {
    height : "30px",
    width : "30px",
    marginRight : "20px",
}

const rankContainer = {
    position: "absolute",
    width: "84px",
    height: "43px",
    left: "386px",
    top: "16px",
    background: "rgba(30, 30, 30, 0.57)",
    border: "1px solid #F6F0ED",
    borderRadius: "16px"
}

const rankText = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    lineHeight: '28px',
    color: '#F6F0ED',
    paddingTop : "7px"
}

const backBtn = {
    position: "absolute",
    width: "34px",
    height: "34px",
    left: "30px",
    top: "21px",
    background: "rgba(30, 30, 30, 0.57)",
    border: "1px solid #F6F0ED",
    borderRadius : "24px",
    cursor : "pointer"
}

const backImg = {
    width : "8px",
    height : "16px",
    position : "absolute",
    top : "9px",
    left : "12px"
}

const middleContainer = {
    marginLeft : "100px",
    marginRight : "100px",
    display : "flex",
    justifyContent : "space-between",
    textAlign: "center",
    marginTop : "100px"
}

const statsBox = {
    width: "600px",
    height: "418px",
    backgroundColor: "#F6F0ED",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    paddingTop : "10px",
    textAlign : "center"
}

const statsContainer = {
    display : 'flex',
    flexWrap: 'wrap',
    marginTop : "30px",
    marginLeft : "60px",
    marginRight : "60px"
}

const captureBox = {
    width: "254px",
    height: "243px",
    backgroundColor: "#F6F0ED",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    marginTop : "93px"
}

const statsTitle = {
    fontFamily : "Roboto",
    fontSize : "24px",
    lineHeight : "28px",
    fontWeight : "700",
    letterSpacing: "0.05em",
    paddingTop : "20px"
}

const progressStyle = {
    height : 100,
    width : 100
}

const progressTextStyle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '0.05em',
    marginBottom : "7px"
}

const statText = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
    letterSpacing: '0.05em',
    width : '100px'
}

const statRow = {
    gridTemplateColumns: "repeat(3, auto)",
    justifyContent : "space-between",
    display: "grid",
    flexWrap: "wrap",
    gridColumnGap: "90px",
    gridRowGap : "40px"
}

const captureTitle = {
    fontFamily : "Roboto",
    fontSize : "24px",
    lineHeight : "28px",
    fontWeight : "700",
    letterSpacing: "0.05em",
    paddingTop : "20px"
}

const captureIndicator = {
    marginLeft : '52px',
    marginRight : '52px',
    marginTop : '25px'
}

const captureProgressStyle = {
    height : 150,
    width : 150
}

const progressColorMap = {
    'HP' : '#14CC60',
    'Speed' : '#E4C811',
    'Attack' : '#EF3E33',
    'Defense' : '#004E98',
    'Special Attack' : '#C589E8',
    'Special Defense' : '#2589BD'
}

const progressTextMap = {
    'hp' : 'HP',
    'speed' : 'Speed',
    'attack' : 'Attack',
    'defense' : 'Defense',
    'special-attack' : 'Special Attack',
    'special-defense' : 'Special Defense'
}

const evolutionContainer = {
    marginTop : "82px"
}

function PokemonDetails() {
    const params = useParams();
    const location = useLocation()
    const { from } = location.state
    const [speciesData, setSpeciesData] = useState({});
    const [evolutionData, setEvolutionData] = useState({});
    const [evolutionUrl, setEvolutionUrl] = useState();
    const [flavorText, setFlavorText] = useState();
    const [genera, setGenera] = useState();
    const [statData, setStatData] = useState({});

    async function fetchSpeciesData() {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${from.id}`;
        const result = await axios.get(url);
        setSpeciesData(result.data);
        setEvolutionUrl(result.data.evolution_chain.url);
        for(let i=0; i<result.data.flavor_text_entries.length; i++) {
            if(result.data.flavor_text_entries[i].language.name === "en") {
                setFlavorText(result.data.flavor_text_entries[i].flavor_text);
                break;
            }
        }

        for(let i=0; i<result.data.genera.length; i++) {
            if(result.data.genera[i].language.name === 'en') {
                setGenera(result.data.genera[i].genus);
                break;
            }
        }
    }

    async function fetchEvolutionData() {
        const result = await axios.get(evolutionUrl);
        setEvolutionData(result.data);
    }

    useEffect(() => {
        fetchSpeciesData();
    }, [])

    useEffect(() => {
        if(Object.keys(speciesData).length > 0 && evolutionUrl) {
            fetchEvolutionData();
        }
    }, [speciesData])

    useEffect(() => {
        const statObj = {};
        from.info.stats.map(ele => {
            statObj[progressTextMap[ele.stat.name]] = ele.base_stat
        })
        setStatData(statObj);
    }, [])

    return (
        <div>
            <Header heading={params.name}></Header>
            {Object.keys(speciesData).length > 0 && Object.keys(evolutionData).length > 0 ? <div style={bodyContainer}>
                <div style={topContainer}>
                    <div style={imgContainer}>
                        <img style={dayImg} src={require('../assets/background-day.jpg')} alt=""></img>
                        <div style={imageContainer}>{
                            from.types.map(type => {
                                return <img style={typeIcon} src={imgMap[type["type"]["name"]]}></img>
                            })
                        }</div>
                        <div style={rankContainer}>
                            <div style={rankText}>
                                {from.id.padStart(5, '0').padStart(6, '#')}
                            </div>
                        </div>
                        <div style={backBtn}>
                            <img style={backImg} src={require('../assets/chevron_left.png')}></img>
                        </div>
                        <img style={pokemonImg} src={from.image}></img>
                    </div>
                    <div style={descContainer}>
                        <div style={descriptionBox}>
                            <div style={descriptionTitle}>
                                Description
                            </div>
                            <div style={descriptionText}>
                                {flavorText}
                            </div>
                        </div>
                        <div style={infoBox}>
                            <div style={infoTitle}>
                                Info
                            </div>
                            <div style={infoContainer}>
                                <div style={infoRow}>
                                    <div style={infoAttrTitle}>Height</div>
                                    <div style={infoAttr}>{from.info.height} m</div>
                                </div>
                                <div style={infoRow}>
                                    <div style={infoAttrTitle}>Weight</div>
                                    <div style={infoAttr}>{from.info.weight} Kg</div>
                                </div>
                                <div style={infoRow}>
                                    <div style={infoAttrTitle}>Category</div>
                                    <div style={infoAttr}>{genera}</div>
                                </div>
                                <div style={infoRow}>
                                    <div style={infoAttrTitle}>Abilities</div>
                                    <div style={infoAttr}>{from.info.abilities[0].ability.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={middleContainer}>
                    <div style={statsBox}>
                        <div style={statsTitle}>Stats</div>
                        <div style={statsContainer}>
                            <div style={statRow}>
                                {   
                                    Object.keys(progressColorMap).map(ele => {
                                        return <div style={Object.assign({}, progressStyle,{color : progressColorMap[ele]})}>
                                            <CircularProgressbarWithChildren 
                                                value={statData[ele]} 
                                                styles={buildStyles({
                                                    rotation: 0.5,
                                                    strokeLinecap: 'butt',
                                                    textSize: '16px',
                                                    pathTransitionDuration: 0.5,
                                                    pathColor: progressColorMap[ele],
                                                    textColor: progressColorMap[ele],
                                                    trailColor: '#1E1E1E'
                                                })}
                                            >
                                                <div style={progressTextStyle}>{statData[ele]}</div>
                                            </CircularProgressbarWithChildren>
                                            <div style={statText}>{ele}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div style={captureBox}>
                        <div style={captureTitle}>Capture Rate</div>
                        <div style={captureIndicator}>
                            <div style={Object.assign({}, captureProgressStyle,{color : '#09BC8A'})}>
                                <CircularProgressbarWithChildren 
                                    value={speciesData['capture_rate']} 
                                    styles={buildStyles({
                                        rotation: 0.5,
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: '#09BC8A',
                                        textColor: '#09BC8A',
                                        trailColor: '#1E1E1E'
                                    })}
                                >
                                    <div style={progressTextStyle}>{speciesData['capture_rate']}%</div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={evolutionContainer}>
                    <PokemonEvolution data={evolutionData}></PokemonEvolution>
                </div>
            </div> : <></>}
        </div>
    );
}

export default PokemonDetails;