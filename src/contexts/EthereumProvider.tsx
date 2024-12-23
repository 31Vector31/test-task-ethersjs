import {createContext, ReactNode, useEffect, useState} from "react";
import {getProvider} from "../utils/sundry";
import {JsonRpcSigner} from "ethers";
import {EthereumContextType} from "../types";

const provider = getProvider();

export const EthereumContext = createContext<EthereumContextType | null>(null);

interface EthereumProviderProps {
    children: ReactNode,
}

const EthereumProvider = ({ children }:EthereumProviderProps) => {
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null);

    useEffect(() => {
        async function initSigner() {
            const newSigner = await provider.getSigner();
            setSigner(newSigner);
        }
        initSigner();
    }, []);

    return (
        <EthereumContext.Provider value={{provider, signer, setSigner}}>
            {children}
        </EthereumContext.Provider>
    );
}

export default EthereumProvider;