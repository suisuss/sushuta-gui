import { Movement } from "../pkg/rust_js_snake_game";


export class Controller {
  movement: Movement;

  constructor(onStop: any) {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          this.movement = Movement.TOP
          return
        case 'ArrowDown':
          this.movement = Movement.DOWN
          return
        case 'ArrowLeft':
          this.movement = Movement.LEFT
          return
        case 'ArrowRight':
          this.movement = Movement.RIGHT
          return
        case 'Escape':
            onStop()
            return
        default:
          return;
      }
    })
  }
}