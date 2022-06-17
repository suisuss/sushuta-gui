import { useWeb3React } from "@web3-react/core";
import React from "react";
import GameSelect from "./views/GameSelect";
import Login from "./views/Login";

const App: React.FC = () => {

    const {account, active } = useWeb3React()

    if (account && active) {
        return <GameSelect/>
    }

    return <Login/>
}

export default App