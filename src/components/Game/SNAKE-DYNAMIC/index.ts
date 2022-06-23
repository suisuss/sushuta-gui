
import { SnakeGameManager } from './game-manager'

const main = () => {
    const gameManager = new SnakeGameManager()
    gameManager.run()
    return gameManager
}

export default main
