

import React from "react"
import { useNavigate } from "react-router-dom";
import { GameObject, GameType } from "../views/Play";


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
]

const GameSelect: React.FC = () => {

    const navigate = useNavigate();

    function goToGame(game: GameObject) {
        navigate(`games/play/${game.name}`, { replace: false, state: game});
    }

    return (
        
            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                <table className="container">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, i) => (
                            <tr key={`${game.id}-${i}`} onClick={() => {goToGame(game)}} >
                                <td>{game.id}</td>
                                <td>{game.name}</td>
                                <td>{game.author}</td>
                                <td>{game.rating}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        
    )
}

export default GameSelect