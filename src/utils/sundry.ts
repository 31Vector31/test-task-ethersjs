import {AbstractProvider, BrowserProvider, Contract, ethers, JsonRpcSigner} from "ethers";
import {wrapContract} from "../constants/wrapContract.ts";

export function getProvider(): BrowserProvider | AbstractProvider {
    let provider;
    if (window.ethereum == null) {
        alert("MetaMask not installed");
        provider = ethers.getDefaultProvider();
    } else {
        provider = new ethers.BrowserProvider(window.ethereum);
    }
    return provider;
}

export async function getWalletBalance(walletAddress: string) {
    const provider = getProvider();
    return await provider.getBalance(walletAddress);
}

export async function getAmountWrappedToken(signer: JsonRpcSigner) {
    const contract = new Contract(wrapContract.address, wrapContract.abi, signer);
    const amount = await contract.balanceOf(signer.address);
    return amount;
}