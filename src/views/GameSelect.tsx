

import React, { useEffect, useState } from "react"
import Game, { GameObject, GameType } from "../components/Game";


const games: GameObject[] = [
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
    { type: GameType.DOUG, id: "id", name: "doug", author: "suisuss", source: "", rating: "1" },
]

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
                setGameSelection(games.length - 1)
            } else {
                setGameSelection(gameSelection - 1)
            }

            console.log(`${games[gameSelectionIndex].id}-${gameSelectionIndex}`)

            const test = document.getElementById(`${games[gameSelection].id}-${gameSelection}`)
            console.log(test)
            const test1 = test.focus()
            console.log(test1)
            return

        }

        if (event.key === "ArrowDown") {

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
        return <Game type={gameSelected.type} id={gameSelected.id} setGameSelected={setGameSelected} />
    }

    return (
        <div style={{ position: "absolute", width: "800px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div className="text_shadows" style={{ fontSize: "72px" }} >SUSHUTA ARCADE</div>
            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                <table className="container">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Rating</th>
                    </thead>
                    <tbody>
                        {games.map((game, i) => (
                            <tr key={`${game.id}-${i}`} onClick={() => setGameSelected(games[i])} >
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>{game.author}</td>
                                <td>{game.rating}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GameSelect