import styled, { css } from "styled-components";

export default styled.input`
    border: none;
    border-bottom: 1px solid #ccc;
    height: 2rem;
    font-size: 1rem;
    padding-left: 0.5rem;

    ${({ error }) =>
        error && css`
            border: 1px solid red;
        `}
`;
