import React from "react"


const Header: React.FC = () => {
    return (
        <div style={{ width: "100%", padding: "1rem"}}>
            <div className="text_shadows" style={{ fontSize: "72px", width: "fit-content", margin: "auto", textAlign: "center", paddingRight: "1.5rem"}}>SUSHUTA</div>
            <div className="text_shadows" style={{ fontSize: "48px", width: "fit-content", margin: "auto", textAlign: "center", paddingRight: "1.5rem"}}>ARCADE</div>
        </div>
    )
}

export default Header