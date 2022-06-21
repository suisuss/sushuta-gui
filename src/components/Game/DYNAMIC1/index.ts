
import { GameManager } from './game-manager'


const main = (): GameManager => {
    const gameManager = new GameManager()
    gameManager.run()
    return gameManager
}

export default main
