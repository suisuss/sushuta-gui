import React, { useEffect } from "react"

const run = async () => {
    const a = await import('./src')
    a.default()
}

const SnakeGame: React.FC = () => {

    useEffect(() => {    
        run()
    }, [])


    return (
        <>
            <p>Now: <span id="current-score"></span></p>
            <p>Best: <span id="best-score"></span></p>
            <div id="container" />
        </>
    )
}

export default SnakeGame