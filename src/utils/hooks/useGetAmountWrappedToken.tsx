import {useEffect, useState} from "react";
import {getAmountWrappedToken} from "../sundry";
import {JsonRpcSigner} from "ethers";

export function useGetAmountWrappedToken(signer?: JsonRpcSigner | null, update?: boolean) {
    const [amountWrappedToken, setAmountWrappedToken] = useState<bigint | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!signer) return;
        setLoading(true);
        getAmountWrappedToken(signer)
            .then((response: bigint) => {
                setAmountWrappedToken(response);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [signer, update]);

    return {amountWrappedToken, loading, error};
}