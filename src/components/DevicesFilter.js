import React, { useState } from "react";
import styled from "styled-components";

import Dropdown from "./shared/Dropdown";

const Wrapper = styled.div`
    height: 3rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
`;

const FilterWrapper = styled.div`
    width: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
    align-items: center;
`;

const Label = styled.span`
    font-size: 0.8rem;
    color: darkgray;
`;

const DevicesFilter = ({
    changeFilter,
    dataForFilters,
    showOnlyAvailable,
    setShowOnlyAvailable
}) => {
    const [system, setSystem] = useState("All");
    const [vendor, setVendor] = useState("All");

    const setFilterValues = (system, vendor) => {
        setSystem(system);
        setVendor(vendor);
    };

    const changeFilterValue = (value, typeOfFilter) => {
        typeOfFilter === "os"
            ? setFilterValues(value, "All")
            : setFilterValues("All", value);

        changeFilter(value, typeOfFilter);
    };

    const getDataForFilter = typeOfFilter => {
        const filteredData = dataForFilters.reduce((acc, phone) => {
            if (!acc.some(itt => itt === phone[typeOfFilter])) {
                acc = acc.concat(phone[typeOfFilter]);
            }

            return acc;
        }, []);

        return ["All"].concat(filteredData).filter(filterData => filterData);
    };

    return (
        <Wrapper>
            <FilterWrapper>
                <div>
                    <Label>OS</Label>
                    <Dropdown
                        value={system}
                        onChange={({ target: { value } }) => changeFilterValue(value, "os")}
                        options={getDataForFilter("os")}
                    />
                </div>

                <div>
                    <Label>Vendor</Label>
                    <Dropdown
                        value={vendor}
                        onChange={({ target: { value } }) => changeFilterValue(value, "vendor")}
                        options={getDataForFilter("vendor")}
                    />
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={setShowOnlyAvailable}
                    />{" "}
                    Only Available
                </div>
            </FilterWrapper>
        </Wrapper>
    );
};

export default DevicesFilter;
