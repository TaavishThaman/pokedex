const headerStyle = {
    height : "66px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    textAlign : "center",
    borderRadius : "20px",
    backgroundColor : "#F6F0ED",
    zIndex : 10,
    position : "sticky"
}

const headerTitle = {
    paddingTop : "16px",
    marginLeft : "auto",
    marginRight : "auto",
    fontWeight : "700",
    fontSize: "28px",
    lineHeight: "33px",
    color : "#1E1E1F",
    fontFamily : "Roboto",
    textTransform : "capitalize"
}

function Header(props) {
    return (
        <div style={headerStyle}>
            <div style={headerTitle}>
                {props.heading}
            </div>
        </div>
    )
}

export default Header;