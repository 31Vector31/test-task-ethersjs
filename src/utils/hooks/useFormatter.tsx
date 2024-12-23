import {BigNumberish, formatEther, formatUnits, Numeric, parseUnits,} from "ethers";
import {useCallback, useMemo} from "react";

export function useFormatter() {
    const formatNumberOrString = useCallback((value: number | string, decimals = 2) => {
        const number = Number(value);
        return (number % 1) === 0 ? number.toFixed(0) : number.toFixed(decimals);
    }, []);

    const customFormatEther = useCallback((wei: BigNumberish | null, decimals?: number) => {
        const value = formatEther(wei || 0);
        return Number.isInteger(decimals) ? formatNumberOrString(value, decimals) : value;
    }, [formatNumberOrString]);

    const customParseUnits = useCallback((value: string, unit: string | Numeric) => {
        return parseUnits(value, unit);
    }, []);

    const customFormatUnits = useCallback((value: BigNumberish | null, unit: string | Numeric) => {
        return formatUnits(value || 0, unit);
    }, []);

    const truncateAddress = useCallback((address: string | undefined, start = 6, end = -5) => {
        if (!address) return;
        return `${address.slice(0, start)}...${address.slice(end)}`;
    }, []);

    return useMemo(
        () => ({
            formatNumberOrString,
            customFormatEther,
            truncateAddress,
            customParseUnits,
            customFormatUnits
        }),
        [
            formatNumberOrString,
            customFormatEther,
            truncateAddress,
            customParseUnits,
            customFormatUnits
        ]
    )
}