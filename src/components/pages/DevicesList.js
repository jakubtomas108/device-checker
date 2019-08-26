import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useApi } from "../../lib/useApi";

import DeviceCard from "../DeviceCard";
import DevicesFilter from "../DevicesFilter";
import Loader from "../shared/Loader";

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const InfoText = styled.div`
    text-align: center;
`;

const DevicesList = ({ userData }) => {
    const [devices, setDevices] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ filterValue: "All" });
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

    const api = useApi();

    useEffect(() => {
        getDevicesList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDevicesList = () => {
        setIsLoading(true);

        api.getAllPhones()
            .then(({ data }) => {
                setDevices(data);
                setIsLoading(false);
            })
            .catch(err => console.log({ err }));
    };

    const manipulateWithPhone = (phoneId, actionName) => {
        api[actionName](phoneId)
            .then(() => getDevicesList())
            .catch(err => console.log({ err }));
    };

    const haveDeviceAllParams = device => {
        return device.vendor && device.model && device.os;
    };

    const getFilteredDevices = () => {
        const availableDevices = devices.filter(device =>
            showOnlyAvailable ? !device.borrowed : device
        );

        return availableDevices.filter(device => {
            if (filter.filterValue === "All") return device;
            return device[filter.typeOfFilter] === filter.filterValue;
        });
    };

    return (
        <>
            {devices && (
                <>
                    <DevicesFilter
                        changeFilter={(filter, typeOfFilter) => setFilter({ filterValue: filter, typeOfFilter })}
                        dataForFilters={devices}
                        showOnlyAvailable={showOnlyAvailable}
                        setShowOnlyAvailable={() => setShowOnlyAvailable(prevState => !prevState)}
                    />
                    {getFilteredDevices().length > 0 ? (
                        <CardWrapper>
                            {getFilteredDevices().map(device => (
                                haveDeviceAllParams(device) && (
                                    <DeviceCard
                                        key={device.id}
                                        device={device}
                                        borrowPhone={() =>
                                            manipulateWithPhone(device.id, "borrowPhone")
                                        }
                                        returnPhone={() =>
                                            manipulateWithPhone(device.id, "returnPhone")
                                        }
                                        canReturn={
                                            device.borrowed &&
                                            userData.id === device.borrowed.user.id
                                        }
                                    />
                                ))
                            )}
                        </CardWrapper>
                    ) : (
                            <InfoText>
                                <p>No device found!</p>
                            </InfoText>
                        )}
                </>
            )}

            {isLoading && <Loader />}
        </>
    );
};

export default DevicesList;
