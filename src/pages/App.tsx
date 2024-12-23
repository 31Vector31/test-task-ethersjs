import styled from "styled-components";
import Header from "../components/Header";
import WrapPage from "./Wrap";

const Container = styled.div`
    padding: 20px;
`

const App = () => {
    return (
        <Container>
            <Header/>
            <WrapPage/>
        </Container>
    );
}

export default App;
