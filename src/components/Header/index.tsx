import styled from "styled-components";
import {Button} from "@mui/material";
import {useEthereum} from "../../utils/hooks/useEthereum";
import {useFormatter} from "../../utils/hooks/useFormatter";

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
`

const Header = () => {
    const {signer, connect} = useEthereum();
    const {truncateAddress} = useFormatter();

    return (
        <Container>
            <Button onClick={connect} variant="outlined">
                {signer ? truncateAddress(signer.address) : "Connect"}
            </Button>
        </Container>
    );
}

export default Header;