import { useWeb3React } from "@web3-react/core"
import React from "react"
import GameSelect from "../components/GameSelect"
import Header from "../components/Header"
import Login from "../components/Login"
import { useNavigate } from "react-router-dom"

const dev = true

const Home: React.FC = () => {
    const { account, active } = useWeb3React()
    console.log("HERE")

   

    return (
        <>
            <Header />
            {(account && active) || dev ? <GameSelect /> : <Login />}
        </>
    )
}

export default Home