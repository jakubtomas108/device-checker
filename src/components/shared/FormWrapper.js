import React from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
    width: 40rem;
    height: ${({ login }) => (login ? "16rem" : "30rem")};
    padding: 1rem;
    box-shadow: 1px 1px 3px #ccc;
    margin: 10rem auto;
    padding: 1rem;
    background: white;
    display: grid;
    grid-template-rows: ${({ login }) => login ? "3fr repeat(3, 2fr)" : "3fr repeat(8, 2fr)"};
    align-items: center;
`;

export default ({ login, children }) => (
    <FormWrapper login={login}>{children}</FormWrapper>
);
