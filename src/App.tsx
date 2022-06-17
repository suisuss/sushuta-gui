import React, { useEffect, useState } from "react"



const App: React.FC = () => {

    const wallets = ['WALLETCONNECT', 'WALLETLINK']
    const [walletSelection, _setWalletSelection] = useState(0)

    const walletSelectionRef = React.useRef(walletSelection);
    const setWalletSelection = data => {
        walletSelectionRef.current = data;
        _setWalletSelection(data);
    };

    console.log(walletSelectionRef.current, walletSelection)


    const handleKeyDown = (setWalletSelection) => (event) => {
        const walletSelection = walletSelectionRef.current

        if (event.key === "ArrowUp") {

            if (walletSelection === 0) {
                setWalletSelection(walletSelection + 1)
                
            }
            else if (walletSelection === wallets.length - 1) {
                setWalletSelection(0)
                
            }
            else {
                setWalletSelection(walletSelection + 1)
                
            }
            return

        }

        if (event.key === "ArrowDown") {

            if (walletSelection === wallets.length - 1) {
                setWalletSelection(0)
            } else if (walletSelection === 0 ) {
                setWalletSelection(wallets.length - 1)
            } else {
                setWalletSelection(walletSelection - 1)
            }
            return

        }

    }


    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown(setWalletSelection));

        return () => {
            window.removeEventListener('keydown', handleKeyDown(setWalletSelection));
        }


    }, [])



    return (

        <div style={{ position: "absolute", width: "800px", height: "500px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div className="text_shadows">SUSHUTA</div>
            <div className="text_shadows" style={{ fontSize: "72px" }}>ARCADE</div>


            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>

                <div style={{ width: "400px", margin: "auto 10rem 0 auto" }}>
                    <div style={{ width: "fit", marginBottom: "1rem", textAlign: "left" }}>Connect Your Wallet:</div>
                    {wallets.map((wallet, i) => <div style={{ width: "300px", marginRight: "auto", textAlign: "left" }}><span className="cursor" style={{ color: (i !== walletSelection ? "transparent" : "white") }}>{'>'}</span>&nbsp;{wallet}</div>)}
                </div>




            </div>
        </div>
    )
}

export default App