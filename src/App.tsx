import { useWeb3React } from "@web3-react/core";
import React from "react";
import GameSelect from "./views/GameSelect";
import Login from "./views/Login";

const dev = true

const App: React.FC = () => {

    const {account, active } = useWeb3React()

    if ((account && active) || dev) {
        return <GameSelect/>
    }

    return <Login/>
}

export default App