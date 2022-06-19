

import axios from "axios";
import React, { useEffect, useState } from "react"
import { createDecipher as decrypt } from "../utils/encryptor";

const algorithm = 'aes-256-cfb'

const GameSelect: React.FC = () => {

    const games = ["game-1", "game-2", "conways", "conway"]

    const [gameSelection, _setGameSelection] = useState(0)

    const gameSelectionRef = React.useRef(gameSelection);


    const setGameSelection = data => {
        gameSelectionRef.current = data;
        _setGameSelection(data);
    };

    const handleKeyDown = (setGameSelection) => (event) => {
        const gameSelection = gameSelectionRef.current

        if (event.key === "ArrowUp") {

            if (gameSelection === 0) {
                setGameSelection(gameSelection + 1)

            }
            else if (gameSelection === games.length - 1) {
                setGameSelection(0)

            }
            else {
                setGameSelection(gameSelection + 1)

            }
            return

        }

        if (event.key === "ArrowDown") {

            if (gameSelection === games.length - 1) {
                setGameSelection(0)
            } else if (gameSelection === 0) {
                setGameSelection(games.length - 1)
            } else {
                setGameSelection(gameSelection - 1)
            }
            return

        }

        if (event.key === "Enter") {
            fetchGame(games[gameSelection]).then((reader) => {
                console.log(reader)
            })
        }
    }

    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown(setGameSelection));

        return () => {
            window.removeEventListener('keydown', handleKeyDown(setGameSelection));
        }


    }, [])

    const fetchGame = async (gameName: string) => {

        // Recieved encrypted game file
        const res = await axios.get(`http://localhost:4001/game/${gameName}`, {
            responseType: 'arraybuffer'
        })

        if (res.status !== 200) {
            console.log(res)
            return
        }

        const encryptedWASM = res.data

        // Decrypt encrypted game data
        const decryptedWASM = decrypt("test", algorithm, encryptedWASM).data

        const blob = new Blob([decryptedWASM], { type: "application/wasm" });
        const url = URL.createObjectURL(blob);

        var imports: any = {};
        imports.wbg = {};
        imports.wbg.__wbindgen_throw = (arg0, arg1) => {
            throw new Error(`__wbindgen_throw(${arg0}, ${arg1})`);
        };

        const { module, instance } = await WebAssembly.instantiateStreaming(fetch(url), imports);

        console.log(instance.exports, module)

        return 1
    }


    return (
        <div style={{ position: "absolute", width: "800px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div className="text_shadows" style={{ fontSize: "72px" }} >SUSHUTA ARCADE</div>
            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                <div style={{ width: "400px", margin: "0 8rem auto auto" }}>
                    <div style={{ width: "fit", marginBottom: "1rem", textAlign: "left" }}>SELECT A GAME:</div>
                    {games.map((game, i) => <div style={{ width: "300px", marginRight: "auto", textAlign: "left" }}><span className="cursor" style={{ color: (i !== gameSelection ? "transparent" : "white") }}>{'>'}</span>&nbsp;{game}</div>)}
                </div>
            </div>
        </div>
    )
}

export default GameSelect