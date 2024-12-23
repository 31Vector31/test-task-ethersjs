import {AbstractProvider, BrowserProvider, JsonRpcSigner} from "ethers";
import {Dispatch, SetStateAction} from "react";

export type EthereumContextType = {
    provider: BrowserProvider | AbstractProvider,
    signer: JsonRpcSigner | null,
    setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>,
}