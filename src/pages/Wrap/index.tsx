import styled from "styled-components";
import WrapSection from "./WrapSection";
import {useState} from "react";
import UnwrapSection from "./UnwrapSection.tsx";

const Wrapper = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    height: 100%;
    padding-top: 40px;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    min-width: 300px;
`

const WrapPage = () => {
    const [rerender, setRerender] = useState<boolean>(false);

    return (
        <Wrapper>
            <Container>
                <WrapSection rerender={rerender} setRerender={setRerender}/>
                <UnwrapSection rerender={rerender} setRerender={setRerender}/>
            </Container>
        </Wrapper>
    );
}

export default WrapPage;