const loadingScreen  = {
    height : window.innerHeight,
    width : "100%",
    backgroundColor : "#F6F0ED"
};

const loadingImg = {
    width : "180px",
    height : "180px",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}

function Loading() {
    return (
        <div style={loadingScreen}>
            <img style={loadingImg} src={require("../assets/loading.gif")}></img>
        </div>
    );
}

export default Loading;