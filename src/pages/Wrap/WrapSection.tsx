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

interface WrapSectionProps {
    rerender: boolean,
    setRerender: (value: boolean) => void,
}

const WrapSection = ({rerender, setRerender}: WrapSectionProps) => {
    const {signer, connect} = useEthereum();
    const {balance, loading: balanceLoading, error: balanceError} = useGetWalletBalance(signer?.address, rerender);
    const {customFormatEther, formatNumberOrString, customParseUnits} = useFormatter();
    const notifications = useNotifications();

    const [amount, setAmount] = useState<string>(defaultAmountValue);

    const formattedBalance = customFormatEther(balance);

    const wrap = useCallback(async () => {
        try {
            const contract = new Contract(wrapContract.address, wrapContract.abi, signer);
            const formattedAmount = customParseUnits(amount, wrapContract.token.decimals);
            const response = await contract.deposit({
                value: formattedAmount
            });

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
            case (amount >= formattedBalance):
                return (<Button disabled variant="contained">
                    Insufficient balance
                </Button>);
            default:
                return (<Button onClick={wrap} variant="contained">
                    Wrap
                </Button>);
        }
    }, [amount, connect, formattedBalance, signer, wrap]);

    return (
        <Container>
            <Typography variant="h6">
                Wrap
            </Typography>
            <FieldContainer>
                <NumericalInput value={amount} onChange={setAmount}/>
                {balanceLoading ? (
                    <Skeleton variant="rectangular"/>
                ) : (
                    <BalanceRow>
                        <Typography variant="subtitle1">
                            Balance:
                        </Typography>
                        <Typography variant="subtitle2">
                            {balanceError ?
                                "Error" :
                                (<>{formatNumberOrString(formattedBalance, 3)} ETH</>)
                            }
                        </Typography>
                    </BalanceRow>
                )}
            </FieldContainer>
            {mainButton}
        </Container>
    );
}

export default WrapSection;