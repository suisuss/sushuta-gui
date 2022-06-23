import { Movement } from "./wasmBindgen.js";


export class Controller {
  movement: any;

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