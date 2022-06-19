

import React, { useEffect, useState } from "react"
import Game, { GameObject, GameType } from "../components/Game";


const games: GameObject[] = [{ type: GameType.STATIC, id:"snake-static"}, { type: GameType.DYNAMIC1, id:"snake-dynamic1"}]

const GameSelect: React.FC = () => {

    const [gameSelectionIndex, _setGameSelectionIndex] = useState(0)
    const gameSelectionRef = React.useRef(gameSelectionIndex);

    const [gameSelected, _setGameSelected] = useState<GameObject | undefined>(undefined);
    const gameSelectedRef = React.useRef(gameSelectionIndex);

    const setGameSelection = data => {
        gameSelectionRef.current = data;
        _setGameSelectionIndex(data);
    };

    const setGameSelected = data => {
        gameSelectedRef.current = data;
        _setGameSelected(data);
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
            setGameSelected(games[gameSelection])
        }
    }

    useEffect(() => {
        if (gameSelected) { return }
        window.addEventListener("keydown", handleKeyDown(setGameSelection));

        return () => {
            window.removeEventListener('keydown', handleKeyDown(setGameSelection));
        }
    }, [gameSelected])

    if (gameSelected) {
        return <Game type={gameSelected.type} id={gameSelected.id} setGameSelected={setGameSelected}/>
    }

    return (
        <div style={{ position: "absolute", width: "800px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div className="text_shadows" style={{ fontSize: "72px" }} >SUSHUTA ARCADE</div>
            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                <div style={{ width: "400px", margin: "0 8rem auto auto" }}>
                    <div style={{ width: "fit", marginBottom: "1rem", textAlign: "left" }}>SELECT A GAME:</div>
                    {games.map((game, i) => <div key={`${game.id}-${i}`}style={{ width: "300px", marginRight: "auto", textAlign: "left" }}><span className="cursor" style={{ color: (i !== gameSelectionIndex ? "transparent" : "white") }}>{'>'}</span>&nbsp;{game.id}</div>)}
                </div>
            </div>
        </div>
    )
}

export default GameSelect