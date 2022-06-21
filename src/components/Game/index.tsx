import React, { useEffect, useState } from "react"
import axios from "axios";
import { createDecipher as decrypt } from "../../utils/encryptor";
import SnakeGame from "../../assets/staticGames/snakeGame";

import DYNAMIC1 from './DYNAMIC1/wasm'
import { GameManager } from "./DYNAMIC1/game-manager";

const algorithm = 'aes-256-cfb'

// Different game type for different controller presets...
export enum GameType {
    STATIC,
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

const run = async (): Promise<GameManager> => {
    const DYNAMIC1 = await import('./DYNAMIC1')
    const gameInstance = await DYNAMIC1.default()
    return gameInstance
}

const fetchGame = async (id: string, setGameInstance: any) => {
    console.log("FETCHING")
    try {

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

        const _wasmInstance = await DYNAMIC1(url);

        window.URL.revokeObjectURL(url);

        const gameInstance = await run()

        setGameInstance(gameInstance)
    } catch (e) {
        console.error(e)
    }

    return
}

const Game: React.FC<Props> = ({ type, id, setGameSelected }) => {

    const [gameInstance, setGameInstance] = useState<GameManager | undefined>()

    if (type === GameType.STATIC) {
        return <SnakeGame />
    }

    const handleExit = () => {
        console.log(gameInstance)
        gameInstance.onStop()
        setGameSelected(undefined)
    }

    useEffect(() => {
        if (gameInstance) { return }
        fetchGame(id, setGameInstance)
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