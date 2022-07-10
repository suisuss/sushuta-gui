


const run = (GameClientClass: any, canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) {
        alert('Failed to initialize WebGL');
        return;
    }
    
    const FPS_THROTTLE = 1000.0 / 30.0; // milliseconds / frames

    const gameClient = new GameClientClass();
    const initialTime = Date.now();
    let lastDrawTime = -1;// In milliseconds

    function render() {
        window.requestAnimationFrame(render);
        const currTime = Date.now();

        if (currTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currTime;

            gl.viewport(0, 0, canvas.width, canvas.height);
            const elapsedTime = currTime - initialTime;
            gameClient.update(elapsedTime, canvas.width, canvas.height);
            gameClient.render();
        }
    }

    

    render();
    return gameClient
}

export default run
