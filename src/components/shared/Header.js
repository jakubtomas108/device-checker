import React from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: coral;
`;

const NameButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Header = ({ userData, handleLogOut, navigateToCreateDevice }) => (
    <Wrapper>
        <h2>DeviceChecker</h2>

        {Object.keys(userData).length > 0 && (
            <NameButtonWrapper>
                <span>{userData.login}</span>
                {userData.type === "admin" && (
                    <Button
                        label="Create Device"
                        onClick={navigateToCreateDevice}
                    />
                )}
                <Button label="Log out" onClick={handleLogOut} />
            </NameButtonWrapper>
        )}
    </Wrapper>
);


export default Header;
