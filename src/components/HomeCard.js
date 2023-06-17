const cardStyle = {
    width : "320px",
    height : "180px",
    boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    marginTop : "100px",
    borderRadius : "20px",
    backgroundColor : "#1E1E1E"
}

const leftContainer = {
    width : "55%",
    height : "180px",
    position : "relative",
    display : "inline-block"
}

const rightContainer = {
    width : "45%",
    height : "180px",
    position : "relative",
    display : "inline-block"
}

const cardText = {
    fontSize : "26px",
    color : "#fff",
    position: "absolute",
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Roboto'
}

const imageContainer = {
    position: "absolute",
    left: '50%', 
    top: '50%',
    transform: 'translate(-50%, -50%)',

}

const imageStyle = {
    height : "120px",
    width : "120px"
}

function HomeCard(props) {
    return (
        <div style={cardStyle}>
            <div style={leftContainer}>
                <div style={cardText}>{props.title}</div>
            </div>
            <div style={rightContainer}>
                <div style={imageContainer}>
                    <img style={imageStyle} src={props.image} alt={""}></img>
                </div>
            </div>
        </div>
    );
}

export default HomeCard;