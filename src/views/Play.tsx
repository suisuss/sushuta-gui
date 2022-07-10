import React, { useEffect, useState } from "react"
import axios from "axios";
import { createDecipher as decrypt } from "../utils/encryptor";

import dougWasmBindgen from "../constants/gabs/DOUG/wasmBindgen.js"
import runDoug from "../constants/gabs/DOUG"
import { useLocation, useParams } from "react-router-dom";

const algorithm = 'aes-256-cfb'

// Different game type for different controller presets...
export enum GameType {
    DOUG
}

export interface GameObject {
    type: GameType,
    id: string,
    author: string,
    rating: string,
    source: string,
    name: string
}

interface Props {
    type: GameType
    name: string
    setGameSelected: (data: GameObject | undefined) => void
}



const getWasmBindgenAndGameModuleImportString = async (type: GameType) => {
    console.log("HERE", type)
    var run


    switch (type) {
        case GameType.DOUG:
            console.log("LKDJSF")
            run = runDoug
            return [dougWasmBindgen, run]
        default:
            throw Error(`Invaild GameType: ${GameType[type]}`)
    }
}


const fetchGame = async (game: GameObject, setGameInstance: any) => {
    console.log("FETCHING")

    try {



        // Recieved encrypted game file
        const res = await axios.get(`http://localhost:4001/api/games/getGame/${game.name}`, {
            responseType: 'arraybuffer'
        })

        if (res.status !== 200) {
            throw Error("Game fetch failed")
        }


        const encryptedWASM = res.data

        // Decrypt encrypted game data
        const decryptedWASM = decrypt("test", algorithm, encryptedWASM).data

        const blob = new Blob([decryptedWASM], { type: "application/wasm" });
        const url = URL.createObjectURL(blob);

        
        const [wasmBindgen, run] = await getWasmBindgenAndGameModuleImportString(game.type)

        // Load game
        await wasmBindgen.self(url);

        const GameClientClass = wasmBindgen.GameClientClass

        const canvas = document.getElementById('rustCanvas') as HTMLCanvasElement

        const gameInstance = run(GameClientClass, canvas)

        setGameInstance(gameInstance)

        window.URL.revokeObjectURL(url);

        return
    } catch (e) {
        console.log(e)
    }

}

const Play: React.FC = () => {
    const params = useParams();
    const location = useLocation()
    const [gameInstance, setGameInstance] = useState<any | undefined>()
    console.log(params, location)

    const game: GameObject = location.state as GameObject


    useEffect(() => {
        if (gameInstance) { return }
        fetchGame(game, setGameInstance)
    }, [])


    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={console.log}>Exit</button>

            <canvas id="rustCanvas" style={{ margin: "auto" }} width={500} height={500}></canvas>

        </div>
    )
}

export default Play