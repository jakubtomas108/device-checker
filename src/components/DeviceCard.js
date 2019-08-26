import React from "react";
import styled from "styled-components";

import HeadingText from "./shared/HeadingText";
import ConfirmButton from "./shared/ConfirmButton";
import BorrowInfo from "./BorrowInfo";

const Wrapper = styled.div`
    width: 18rem;
    height: 20rem;
    background: white;
    box-shadow: 1px 1px 3px #ccc;
    display: grid;
    grid-template-rows: 3fr 1fr 1fr 0.5fr;
    padding: 0.5rem;
    margin: 1rem;
`;

const Image = styled.div`
    background: ${({ src }) => `url(${src})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: flex-end;
`;

const DeviceCart = ({
    device,
    borrowPhone,
    returnPhone,
    canReturn
}) => (
        <Wrapper>
            <Image
                src={device.image
                    ? device.image
                    : "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
                }
            >
                {device.borrowed && (
                    <BorrowInfo
                        borrowedBy={device.borrowed.user.name}
                        date={device.borrowed.date}
                    />
                )}
            </Image>

            <HeadingText heading={device.model} subheading={device.vendor} deviceTitle />

            <p>{`${device.os} ${device.osVersion && `/ ${device.osVersion}`}`}</p>

            <ConfirmButton
                disabled={!canReturn && device.borrowed}
                label={canReturn ? "return" : device.borrowed ? "borrowed" : 'borrow'}
                onClick={canReturn ? returnPhone : borrowPhone}
            />
        </Wrapper>
    );

export default DeviceCart;
