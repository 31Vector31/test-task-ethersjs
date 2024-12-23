import {useCallback, useContext} from "react";
import {EthereumContext} from "../../contexts/EthereumProvider";

export function useEthereum() {
    const {provider, signer, setSigner} = useContext(EthereumContext);

    const connect = useCallback(async () => {
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
    }, [provider, setSigner]);

    return {provider, signer, connect};
}