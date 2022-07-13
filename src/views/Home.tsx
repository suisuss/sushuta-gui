import { useWeb3React } from "@web3-react/core"
import React from "react"
import GameSelect from "../components/GameSelect"
import Header from "../components/Header"
import Connect from "../components/Connect"

const dev = true

const Home: React.FC = () => {
    const { account, active } = useWeb3React()
    console.log("HERE")

   

    return (
        <>
            <Header />
            <Connect />
            { account && active && <GameSelect /> }
        </>
    )
}

export default Home