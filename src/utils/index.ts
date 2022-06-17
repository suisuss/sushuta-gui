import { Web3Provider } from "@ethersproject/providers";


export function getLibrary(provider: any) {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
}

export const shortenAddress = (address: any) => address.substr(0, 6) + "..." + address.substr(-4);