import React, { useEffect, useState } from "react"
import axios from "axios";
import { createDecipher as decrypt } from "../../utils/encryptor";
import SnakeGame from "../../assets/staticGames/snakeGame";

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

const fetchGame = async (id: string, setInstance: any) => {
    console.log("FETCHING")
    try {

        // Recieved encrypted game file
        const res = await axios.get(`http://localhost:4002/game/${id}`, {
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
        console.log(decryptedWASM)

        /*
        const { module, instance } = await WebAssembly.instantiateStreaming(fetch(url), imports);

        console.log(module, instance)
        setInstance(instance)
        */
    } catch (e) {
        console.error(e)
    }

    return
}

const Game: React.FC<Props> = ({ type, id, setGameSelected }) => {

    const [instance, setInstance] = useState<undefined | WebAssembly.Instance>()

    if (type === GameType.STATIC) {
        return <SnakeGame />
    }

    const handleExit = () => {
        setGameSelected(undefined)
    }

    useEffect(() => {
        if (instance) { return }
        fetchGame(id, setInstance)
    }, [])

    useEffect(() => { 
        if (instance) {
            console.log("GOT INSTANCE")  
        }
    }, [instance])

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