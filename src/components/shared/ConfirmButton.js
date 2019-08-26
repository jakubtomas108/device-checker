import React from "react";
import styled from "styled-components";

const StyledConfirmButton = styled.div`
    height: 2rem;
    padding: 0 0.5rem;
    background: ${({ disabled }) => (disabled ? "#ccc" : "tomato")};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px #ccc;
    cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
`;

const ConfirmButton = ({ label, onClick, disabled }) => (
    <StyledConfirmButton
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
    >
        {label.toUpperCase()}
    </StyledConfirmButton>
);


export default ConfirmButton;
