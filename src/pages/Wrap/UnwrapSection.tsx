import styled from "styled-components";
import {Button, Paper, Skeleton, Typography} from "@mui/material";
import {useGetWalletBalance} from "../../utils/hooks/useGetWalletBalance";
import {useEthereum} from "../../utils/hooks/useEthereum";
import {useCallback, useMemo, useState} from "react";
import {useFormatter} from "../../utils/hooks/useFormatter";
import {NumericalInput} from "../../components/Inputs/NumericalInput";
import {useNotifications} from '@toolpad/core/useNotifications';
import {Contract} from "ethers";
import {wrapContract} from "../../constants/wrapContract";
import {useGetAmountWrappedToken} from "../../utils/hooks/useGetAmountWrappedToken.tsx";

const Container = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`
const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const BalanceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const defaultAmountValue = "";

interface UnwrapSectionProps {
    rerender: boolean,
    setRerender: (value: boolean) => void,
}

const UnwrapSection = ({rerender, setRerender}: UnwrapSectionProps) => {
    const {signer, connect} = useEthereum();
    const {amountWrappedToken, loading: amountWrappedTokenLoading, error: amountWrappedTokenError} = useGetAmountWrappedToken(signer, rerender);
    const {customFormatUnits, formatNumberOrString, customParseUnits} = useFormatter();
    const notifications = useNotifications();

    const [amount, setAmount] = useState<string>(defaultAmountValue);

    const formattedAmountWrappedToken = customFormatUnits(amountWrappedToken, wrapContract.token.decimals);

    const wrap = useCallback(async () => {
        try {
            const contract = new Contract(wrapContract.address, wrapContract.abi, signer);
            const formattedAmount = customParseUnits(amount, wrapContract.token.decimals);
            const response = await contract.withdraw(formattedAmount);

            await response.wait();

            setAmount(defaultAmountValue);
            setRerender(!rerender);

            notifications.show('Success', {
                severity: 'success',
                autoHideDuration: 3000,
            });
        } catch {
            notifications.show('Error', {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
    }, [amount, customParseUnits, notifications, rerender, setRerender, signer]);

    const mainButton = useMemo(() => {
        switch (true) {
            case !signer:
                return (<Button onClick={connect} variant="contained">
                    Connect wallet
                </Button>);
            case (!amount):
                return (<Button disabled variant="contained">
                    Enter an amount
                </Button>);
            case (amount >= formattedAmountWrappedToken):
                return (<Button disabled variant="contained">
                    Insufficient balance
                </Button>);
            default:
                return (<Button onClick={wrap} variant="contained">
                    Unwrap
                </Button>);
        }
    }, [amount, connect, formattedAmountWrappedToken, signer, wrap]);

    return (
        <Container>
            <Typography variant="h6">
                Unwrap
            </Typography>
            <FieldContainer>
                <NumericalInput value={amount} onChange={setAmount}/>
                {amountWrappedTokenLoading ? (
                    <Skeleton variant="rectangular"/>
                ) : (
                    <BalanceRow>
                        <Typography variant="subtitle1">
                            Balance:
                        </Typography>
                        <Typography variant="subtitle2">
                            {amountWrappedTokenError ?
                                "Error" :
                                (<>{formatNumberOrString(formattedAmountWrappedToken, 3)} {wrapContract.token.symbol}</>)
                            }
                        </Typography>
                    </BalanceRow>
                )}
            </FieldContainer>
            {mainButton}
        </Container>
    );
}

export default UnwrapSection;