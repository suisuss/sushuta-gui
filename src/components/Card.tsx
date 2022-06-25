

const SushutaArcadeCard: React.FC = () => {
    return(
        <div style={{ position: "absolute", width: "600px", height: "600px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div style={{
                width: "350px", height: "200px", marginTop: "200px",
                boxShadow: "8px 10px 10px #aaa",
                background: "linear-gradient(90deg, #3d5786, #eb6782 5%, #d7c82b 35%, #33aba0 65%, #295ba7 95%, #3d5786)", borderRadius: "16px", border: "3px solid transparent"
            }}>
                <div style={{
                    width: "100%", height: "100%",
                    boxShadow: "inset 0 0 12px 12px #22272e, inset 0 0 3px 2px #22272e",
                    borderRadius: "14px",
                    background: "#22272e",
                    paddingTop: "46px",
                    paddingLeft: "8px"

                }}>
                    <div style={{ transform: "rotate(-4deg)" }}>
                        <div className="text_shadows" style={{ fontSize: "48px" }}>SUSHUTA</div>
                        <div className="text_shadows" style={{ fontSize: "32px" }}>ARCADE</div>
                    </div>
                </div>
            </div>

        </div>
    )
}