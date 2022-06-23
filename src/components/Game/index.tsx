import React, { useEffect, useState } from "react"
import axios from "axios";
import { createDecipher as decrypt } from "../../utils/encryptor";
import SnakeGame from "../../assets/staticGames/snakeGame";

import snakeWasmBindgen from "./SNAKE-DYNAMIC/wasmBindgen.js";
import { SnakeGameManager } from "./SNAKE-DYNAMIC/game-manager";


import dynamic1WasmBindgen from "./DYNAMIC1/wasmBindgen.js";
import { Dyanmic1GameManager } from "./DYNAMIC1/game-manager";

const algorithm = 'aes-256-cfb'

// Different game type for different controller presets...
export enum GameType {
    STATIC,
    SNAKE,
    DYNAMIC0,
    DYNAMIC1,
    DYNAMIC3
}

export interface GameObject {
    type: GameType,
    id: string
}

interface Props {
    type: GameType
    id: string
    setGameSelected: (data: GameObject | undefined) => void
}

interface GameInstace {
    GameManager: GameManager
    WASMBindgen: any
}


const getWasmBindgenAndGameModuleImportString = async (type: GameType) => {
    var run
    switch (type) {
        case GameType.SNAKE:
            run = await import('./SNAKE-DYNAMIC')
            return [snakeWasmBindgen, run]
        case GameType.DYNAMIC1:
            run = await import('./DYNAMIC1')
            return [dynamic1WasmBindgen, run]
        default:
            throw Error(`Invaild GameType: ${GameType[type]}`)
    }
}


type GameManager = SnakeGameManager | Dyanmic1GameManager

const fetchGame = async (id: string, type: GameType, setGameInstance: any) => {
    console.log("FETCHING")


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

    const [wasmBindgen, game] = await getWasmBindgenAndGameModuleImportString(type)
    const WASMBindgen = await wasmBindgen(url);
    const GameManager = await game.default()

    setGameInstance({ GameManager, WASMBindgen })

    window.URL.revokeObjectURL(url);


    return
}

const Game: React.FC<Props> = ({ type, id, setGameSelected }) => {

    const [gameInstance, setGameInstance] = useState<GameInstace | undefined>()

    if (type === GameType.STATIC) {
        return <SnakeGame />
    }

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
            <p>TYPE: {`${type}`}</p>
            <p>Now: <span id="current-score"></span></p>
            <p>Best: <span id="best-score"></span></p>
            <div id="container" />
        </>
    )
}

export default Game