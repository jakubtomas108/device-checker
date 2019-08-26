import React from "react";
import styled from "styled-components";

const HeadingText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Subheading = styled.span`
    color: ${({ deviceTitle }) => deviceTitle && "#ccc"};
`;

export default ({ heading, subheading, deviceTitle }) => (
    <div>
        <HeadingText>{heading}</HeadingText>

        {subheading && (
            <Subheading deviceTitle={deviceTitle}>
                {deviceTitle ? subheading.toUpperCase() : subheading}
            </Subheading>
        )}
    </div>
);
