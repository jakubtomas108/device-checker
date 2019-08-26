import React from "react";
import styled from "styled-components";

const StyledButton = styled.div`
    height: 2rem;
    min-width: 3rem;
    width: auto;
    padding: 0 0.5rem;
    margin: 0 0.5rem;
    background: whitesmoke;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-shadow: 1px 1px 3px #ccc;

    :hover {
        background: lavender;
    }
`;

const Button = ({ label, onClick }) => (
    <StyledButton onClick={onClick}>{label.toUpperCase()}</StyledButton>
);

export default Button;
