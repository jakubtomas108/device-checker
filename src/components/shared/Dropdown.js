import React from "react";
import styled from "styled-components";

const StyledDropdown = styled.div`
    overflow: hidden;
    background: inherit;
    border-bottom: 1px solid #ccc;
    border: ${({ error }) => error && "1px solid red"};
`;

const StyledSelect = styled.select`
    width: 100%;
    height: 2rem;
    font-size: 1rem;
    border: none;
    box-shadow: none;
    background: transparent;
    outline: none;
`;

const Dropdown = ({ value, options, onChange, error }) => {
    const isCreatingDevice = option =>
        option === "Vendor" || option === "Operating System";

    return (
        <StyledDropdown error={error}>
            <StyledSelect value={value} onChange={onChange}>
                {options &&
                    options.map((option, index) => (
                        <option
                            key={index}
                            value={isCreatingDevice(option) ? "" : option}
                            disabled={isCreatingDevice(option)}
                        >
                            {option}
                        </option>
                    ))}
            </StyledSelect>
        </StyledDropdown>
    );
};

export default Dropdown;
