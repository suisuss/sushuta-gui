import React, { useEffect, useState } from "react"
import {
    URI_AVAILABLE,
    UserRejectedRequestError,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

import { UnsupportedChainIdError, Web3ReactProvider } from "@web3-react/core";
import {
    walletconnect,
    walletlink
} from "../connectors";

import { useWeb3React } from "@web3-react/core";
import { getNotifyBG, notify, ToasterMessage } from "../components/Toaster";
import { ResponseStatus } from "../interfaces";

type Connector = any


function getErrorMessage(error: any) {
    if (error instanceof UnsupportedChainIdError) {
        return "You're connected to an unsupported network.";
    } else if (
        error instanceof UserRejectedRequestErrorWalletConnect ||
        error instanceof UserRejectedRequestError
    ) {
        return "Please authorize this website to access your Ethereum account.";
    } else if (error.message.includes('accounts received is empty')) {
        return "No account was connected upon request."
    } else {
        console.error(error);
        return "An unknown error occurred. Check the console for more details.";
    }
}


const connectorsByName: Record<string, Connector> = {
    'WalletConnect': walletconnect,
    'WalletLink': walletlink
};


const Login: React.FC = () => {

    const wallets = ['WalletConnect', 'WalletLink']


    const [walletSelection, _setWalletSelection] = useState(0)

    const { error, account, setError, connector, deactivate, activate } = useWeb3React()

    const walletSelectionRef = React.useRef(walletSelection);
    const setWalletSelection = data => {
        walletSelectionRef.current = data;
        _setWalletSelection(data);
    };

    const handleKeyDown = (setWalletSelection) => (event) => {
        const walletSelection = walletSelectionRef.current

        if (event.key === "ArrowUp") {

            if (walletSelection === 0) {
                setWalletSelection(walletSelection + 1)

            }
            else if (walletSelection === wallets.length - 1) {
                setWalletSelection(0)

            }
            else {
                setWalletSelection(walletSelection + 1)

            }
            return

        }

        if (event.key === "ArrowDown") {

            if (walletSelection === wallets.length - 1) {
                setWalletSelection(0)
            } else if (walletSelection === 0) {
                setWalletSelection(wallets.length - 1)
            } else {
                setWalletSelection(walletSelection - 1)
            }
            return

        }

        if (event.key === "Enter") {
            const currentConnector = connectorsByName[wallets[walletSelection]]
            setActivatingConnector(currentConnector);
            activate(currentConnector);
        }
    }

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState<any>();
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);


    useEffect(() => {

        window.addEventListener("keydown", handleKeyDown(setWalletSelection));

        return () => {
            window.removeEventListener('keydown', handleKeyDown(setWalletSelection));
        }


    }, [])


    // log the walletconnect URI
    useEffect(() => {
        const logURI = (uri: any) => {
            console.log("WalletConnect URI", uri);
        };
        walletconnect.on(URI_AVAILABLE, logURI);

        return () => {
            walletconnect.off(URI_AVAILABLE, logURI);
        };
    }, []);

    useEffect(() => {
        if (connector instanceof WalletConnectConnector) {
            if ((connector.walletConnectProvider as any)?.signer?.connection?.wc?._accounts.length === 0) { connector.walletConnectProvider = undefined }
        }
    }, [connector])

    if (error && !account) {
        const errorMsg = getErrorMessage(error)
        notify({ title: "Connection Error", content: errorMsg, status: ResponseStatus.FAIL } as ToasterMessage, getNotifyBG(ResponseStatus.FAIL))

        setError(undefined)
        deactivate()
    }


    return (
        <div style={{ position: "absolute", width: "800px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column" }}>
            <div className="text_shadows">SUSHUTA</div>
            <div className="text_shadows" style={{ fontSize: "72px" }}>ARCADE</div>
            <div className="text_pulsate" style={{ fontSize: "24px", color: "white", fontFamily: "Bungee", width: "100%", display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ width: "400px", margin: "auto 10rem 0 auto" }}>
                    <div style={{ width: "fit", marginBottom: "1rem", textAlign: "left" }}>Connect Your Wallet:</div>
                    {wallets.map((wallet, i) => <div style={{ width: "300px", marginRight: "auto", textAlign: "left" }}><span className="cursor" style={{ color: (i !== walletSelection ? "transparent" : "white") }}>{'>'}</span>&nbsp;{wallet}</div>)}
                </div>
            </div>
        </div>
    )
}

export default Login