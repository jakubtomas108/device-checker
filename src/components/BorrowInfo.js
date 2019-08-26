import React from "react";
import styled from "styled-components";

const StyledBorrowInfo = styled.div`
    height: 2rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    color: white;
    padding: 0 0.5rem;
    font-size: 0.8rem;
`;

const BorrowInfo = ({ borrowedBy, date }) => {
    const convertedDate = new Date(date).toDateString();

    return (
        <StyledBorrowInfo>
            {`Borrowed By: ${borrowedBy}, ${convertedDate}`}
        </StyledBorrowInfo>
    );
};

export default BorrowInfo;
