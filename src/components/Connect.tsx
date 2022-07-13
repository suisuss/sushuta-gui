import React, { useEffect, useState } from "react"
import {
    URI_AVAILABLE,
    UserRejectedRequestError,
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from "@web3-react/walletconnect-connector";

import { UnsupportedChainIdError } from "@web3-react/core";
import {
    injected,
    walletconnect,
    walletlink
} from "../connectors";

import { useWeb3React } from "@web3-react/core";
import { getNotifyBG, notify, ToasterMessage } from "./Toaster";
import { ResponseStatus } from "../interfaces";
import useEagerConnect from "../useEagerConnect";
import { shortenAddress } from "../utils";

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
    'WalletLink': walletlink,
    'Metamask': injected
};


const Connect: React.FC = () => {

    const { error, account, setError, connector, deactivate, activate, active } = useWeb3React()

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState<any>();
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);

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

    const triedEager = useEagerConnect();

    return (
        <>
            <div className="text_pulsate" onClick={() => {
                if (account && active) deactivate()
            }} style={{ width: "100%", fontSize: "24px", color: "white", fontFamily: "Bungee", cursor: account && active ? 'pointer' : 'default'}}>
                {account && active
                    ? shortenAddress(account)
                    : (
                        <div style={{ display: "inline-block", margin: "auto", width: "fit-content" }}>
                            {Object.keys(connectorsByName).map((name: string) => {
                                const currentConnector = connectorsByName[name];
                                const activating = currentConnector === activatingConnector;
                                const connected = currentConnector === connector;
                                const disabled = !triedEager || !!activatingConnector || connected || !!error;

                                return (
                                    <div onClick={() => {
                                        if (disabled) { return }
                                        setActivatingConnector(currentConnector);
                                        activate(connectorsByName[name]);
                                    }} key={name} style={{ cursor: "pointer", margin: "0 2rem", textAlign: "center" }}>{activating ? "Syncing..." : name.toUpperCase()}</div>
                                );
                            })
                            }
                        </div>
                    )
                }
            </div>
        </>

    )
}

export default Connect