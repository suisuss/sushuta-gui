const getRange = length => [...Array(length).keys()]

export class View {
  gameWidth: number;
  gameHeight: number;
  container: HTMLDivElement;
  onViewChange: () => void;
  unitOnScreen: number;
  projectDistance: (distance: any) => any;
  projectPosition: (position: any) => any;
  context: CanvasRenderingContext2D;

  constructor(gameWidth, gameHeight, onViewChange = () => {}) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.container = document.getElementById('container') as HTMLDivElement
    this.onViewChange = onViewChange
    this.setUp()

    window.addEventListener('resize', () => {
      const [child] = this.container.children
      if (child) {
        this.container.removeChild(child)
      }
      this.setUp()
      this.onViewChange()
    })
  }

  setUp() {
    const { width, height } = this.container.getBoundingClientRect()
    this.unitOnScreen = Math.min(
      width / this.gameWidth,
      height / this.gameHeight
    )
    this.projectDistance = distance => distance * this.unitOnScreen
    this.projectPosition = position => position.scale_by(this.unitOnScreen)

    const canvas = document.createElement('canvas')
    this.container.appendChild(canvas)
    this.context = canvas.getContext('2d')
    canvas.setAttribute('width', this.projectDistance(this.gameWidth))
    canvas.setAttribute('height', this.projectDistance(this.gameHeight))
  }

  render(food, player, score, bestScore) {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    )
    
    this.context.globalAlpha = 0.2
    this.context.fillStyle = 'black'
    getRange(this.gameWidth).forEach(column =>
      getRange(this.gameHeight)
      .filter(row => (column + row) % 2 === 1)
      .forEach(row =>
        this.context.fillRect(
          column * this.unitOnScreen,
          row * this.unitOnScreen,
          this.unitOnScreen,
          this.unitOnScreen
        )
      )
    )
    this.context.globalAlpha = 1

    const projectedReward = this.projectPosition(food)
    this.context.beginPath()
    this.context.arc(
      projectedReward.x,
      projectedReward.y,
      this.unitOnScreen / 2.5,
      0,
      2 * Math.PI
    )
    this.context.fillStyle = '#e74c3c'
    this.context.fill()

    const projectPlayer = this.projectPosition(player[0])
    this.context.beginPath()
    this.context.arc(
      projectPlayer.x,
      projectPlayer.y,
      this.unitOnScreen / 2.5,
      0,
      2 * Math.PI
    )
    this.context.fillStyle = '#e74c3c'
    this.context.fill()

    /*
    const projectPlayer = this.projectPosition(player[0])
    this.context.beginPath()
    this.context.rect(projectPlayer.x, projectPlayer.y, this.unitOnScreen / 2.5, this.unitOnScreen / 2.5);
    this.context.fillStyle = '#fff' // thats white!!
    this.context.fill()
    */

    document.getElementById('current-score').innerText = score
    document.getElementById('best-score').innerText = bestScore
  }
}