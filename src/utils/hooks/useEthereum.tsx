import {useCallback, useContext} from "react";
import {EthereumContext} from "../../contexts/EthereumProvider";
import {EthereumContextType} from "../../types";
import {BrowserProvider} from "ethers";

export function useEthereum() {
    const {provider, signer, setSigner} = useContext<EthereumContextType | null>(EthereumContext) || {};

    const connect = useCallback(async () => {
        if (!provider || !setSigner) return;

        if (provider instanceof BrowserProvider) {
            const newSigner = await provider.getSigner();
            setSigner(newSigner);
        }
    }, [provider, setSigner]);

    return {provider, signer, connect};
}