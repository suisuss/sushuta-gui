import React, { useEffect, useState } from "react"
import axios from "axios";
import { createDecipher as decrypt } from "../../utils/encryptor";

import dougWasmBindgen from "./DOUG/wasmBindgen.js"

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
    id: string
    setGameSelected: (data: GameObject | undefined) => void
}



const getWasmBindgenAndGameModuleImportString = async (type: GameType) => {
    var run
    switch (type) {
        case GameType.DOUG:
            run = await import('./DOUG')
            return [dougWasmBindgen, run.default]
        default:
            throw Error(`Invaild GameType: ${GameType[type]}`)
    }
}


const fetchGame = async (id: string, type: GameType, setGameInstance: any) => {
    console.log("FETCHING")

    console.log(id)
    // Recieved encrypted game file
    const res = await axios.get(`http://localhost:4001/game/${id}`, {
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

    const [wasmBindgen, run] = await getWasmBindgenAndGameModuleImportString(type)

    // Load game
    await wasmBindgen.self(url);

    const GameClientClass = wasmBindgen.GameClientClass

    const canvas = document.getElementById('rustCanvas') as HTMLCanvasElement

    const gameInstance = run(GameClientClass, canvas)

    setGameInstance(gameInstance)

    window.URL.revokeObjectURL(url);

    return
}

const Game: React.FC<Props> = ({ type, id, setGameSelected }) => {

    const [gameInstance, setGameInstance] = useState<any | undefined>()
    console.log(gameInstance)

    const handleExit = () => {
        gameInstance.GameManager.onStop()
        setGameSelected(undefined)
    }

    useEffect(() => {
        if (gameInstance) { return }
        fetchGame(id, type, setGameInstance)
    }, [])

    return (
        <>
            <button onClick={handleExit}>EXIT</button>
            <canvas id="rustCanvas" width={500} height={500}></canvas>
            
        </>
    )
}

export default Game