import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";

import { osOptions, vendorOptions } from "../../lib/constants";
import { useApi } from "../../lib/useApi";

import FormWrapper from "../shared/FormWrapper";
import HeadingText from "../shared/HeadingText";
import Input from "../shared/Input";
import Dropdown from "../shared/Dropdown";
import ConfirmButton from "../shared/ConfirmButton";
import Button from "../shared/Button";
import ErrorText from "../shared/ErrorText";
import Loader from "../shared/Loader";

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const CreateDevice = () => {
    const [code, setCode] = useState("");
    const [vendor, setVendor] = useState("");
    const [model, setModel] = useState("");
    const [os, setOs] = useState("");
    const [osVersion, setOsVersion] = useState("");
    const [image, setImage] = useState("");
    const [inputErrors, setInputErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const api = useApi();

    const areAllInputsValid = () => {
        const requiredInputValues = { code, vendor, model, os };

        const wrongInputs = Object.entries(requiredInputValues)
            .map(entry => !entry[1] && entry[0])
            .filter(entry => entry);

        setInputErrors(wrongInputs);

        return !Object.values(requiredInputValues).some(
            inputValue => !inputValue
        );
    };

    const isInputValid = inputName => {
        return inputErrors.some(inputError => inputError === inputName);
    };

    const createNewDevice = () => {
        setInputErrors([]);

        if (!areAllInputsValid()) return;

        setIsLoading(true);
        api.createNewDevice({
            code,
            vendor,
            model,
            os,
            osVersion,
            image
        })
            .then(() => navigate("/devices-list"))
            .catch(err => console.log({ err }));
    };

    return (
        <FormWrapper>
            <HeadingText heading="Create new device" />

            <Input
                value={code}
                onChange={({ target: { value } }) => setCode(value)}
                placeholder="Device ID"
                error={isInputValid("code")}
            />

            <Dropdown
                value={vendor}
                options={vendorOptions}
                onChange={({ target: { value } }) => setVendor(value)}
                error={isInputValid("vendor")}
            />

            <Input
                value={model}
                onChange={({ target: { value } }) => setModel(value)}
                placeholder="Model"
                error={isInputValid("model")}
            />

            <Dropdown
                value={os}
                onChange={({ target: { value } }) => setOs(value)}
                options={osOptions}
                error={isInputValid("os")}
            />

            <Input
                value={osVersion}
                onChange={({ target: { value } }) => setOsVersion(value)}
                placeholder="OS Version"
            />

            <Input
                value={image}
                onChange={({ target: { value } }) => setImage(value)}
                placeholder="Image(URL)"
            />

            <div>
                {inputErrors.length > 0 && (
                    <ErrorText>Red inputs must be filled</ErrorText>
                )}
            </div>

            <ButtonWrapper>
                <ConfirmButton
                    label="create new device"
                    onClick={createNewDevice}
                />
                <Button
                    label="cancel"
                    onClick={() => navigate("/devices-list")}
                />
            </ButtonWrapper>

            {isLoading && <Loader />}
        </FormWrapper>
    );
};

export default CreateDevice;
