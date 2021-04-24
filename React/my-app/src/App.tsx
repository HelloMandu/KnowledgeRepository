import React from "react";
import styled from "@emotion/styled";
import { ModalContainer } from "./portal/modal-container";

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppWrapper>
      <ModalContainer />
    </AppWrapper>
  );
}

export default App;
