import imgMap from "../data/icons"

const cardStyle = {
    height : "220px",
    width : "180px",
    backgroundColor : "#1E1E1E",
    borderRadius: "20px",
    position : "relative",
    marginBottom : "50px",
    marginLeft : "50px",
    marginRight : "50px"
}

const imgStyle = {
    height : "140px",
    width : "140px",
    position : "absolute",
    left : "20px",
    top : "110px"
}

const idStyle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#FFFFFF',
    position : 'absolute',
    top : "20px",
    left : "20px"
}

const nameContainer = {
    width : "100%",
    textAlign : "center"
}

const nameStyle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '23px',
    color: '#FFFFFF',
    marginTop : '46px',
    textTransform : 'capitalize'
}

const iconContainer = {
    display : 'flex',
    justifyContent : 'center',
    marginTop : "9px"
}

const iconStyle = {
    height : "22px",
    width : "22px",
    marginLeft : "5px",
    marginRight : "5px"
}

function PokemonEvolutionCard(props) {
    return (
        <div style={cardStyle}>
            <div style={idStyle}>{props.cardData[1][0].toString().padStart(5, '0').padStart(6, '#')}</div>
            <div style={nameContainer}>
                <div style={nameStyle}>{props.cardData[0]}</div>
            </div>
            <div style={iconContainer}>
                {
                    props.cardData[1][2].map(ele => {
                        return <img style={iconStyle} src={imgMap[ele["type"]["name"]]}></img>
                    })
                }
            </div>
            <img style={imgStyle} src={props.cardData[1][1]}></img>
        </div>
    )
}

export default PokemonEvolutionCard;