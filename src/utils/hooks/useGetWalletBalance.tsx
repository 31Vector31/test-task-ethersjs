import {useEffect, useState} from "react";
import {getWalletBalance} from "../sundry";

export function useGetWalletBalance(walletAddress?: string, update?: boolean) {
    const [balance, setBalance] = useState<bigint | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!walletAddress) return;
        setLoading(true);
        getWalletBalance(walletAddress)
            .then((response: bigint) => {
                setBalance(response);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [walletAddress, update]);

    return {balance, loading, error};
}