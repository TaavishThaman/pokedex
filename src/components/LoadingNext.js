const loadingScreen  = {
    height : "50px",
    width : "100%",
    backgroundColor : "#F6F0ED",
    position : "relative"
};

const loadingImg = {
    width : "40px",
    height : "40px",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}

function LoadingNext() {
    return (
        <div style={loadingScreen}>
            <img style={loadingImg} src={require("../assets/loading.gif")}></img>
        </div>
    );
}

export default LoadingNext;