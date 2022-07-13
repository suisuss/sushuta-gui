import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

// const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/c44b87f811dd45d8a47cdf6965899faa",
  4: "https://rinkeby.infura.io/v3/c44b87f811dd45d8a47cdf6965899faa"
};

const supportedChainIds = [1, 4]

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: supportedChainIds
});


export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: "metakrew claim walletlink",
  supportedChainIds: supportedChainIds
});
