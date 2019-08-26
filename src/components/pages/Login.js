import React, { useState } from "react";
import { navigate } from "@reach/router";

import { useApi } from "../../lib/useApi";

import HeadingText from "../shared/HeadingText";
import Input from "../shared/Input";
import ConfirmButton from "../shared/ConfirmButton";
import Loader from "../shared/Loader";
import FormWrapper from "../shared/FormWrapper";
import ErrorText from "../shared/ErrorText";

const Login = ({ setUserData }) => {
    const [email, setEmail] = useState("gandalf.the.grey@etnetera.cz");
    const [password, setPassword] = useState("wh1tew1zard");
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    const api = useApi();

    const handleLogIn = () => {
        setIsLoading(true);
        setErrorText("");

        api.logIn(email, password)
            .then(({ data }) => {
                setIsLoading(false);
                sessionStorage.setItem("user", JSON.stringify(data));
                setUserData(data);
                navigate("/devices-list");
            })
            .catch(err => {
                setIsLoading(false);
                setErrorText(err.response.data.error);

                console.log({ err });
            });
    };

    return (
        <FormWrapper login>
            <HeadingText
                heading="Log In"
                subheading="After Log In, You can borrow the cellphone for testing"
            />

            <Input
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="E-mail"
            />

            <Input
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
            />

            <div>{errorText && <ErrorText>{errorText}</ErrorText>}</div>

            <ConfirmButton onClick={handleLogIn} label="log in" />

            {isLoading && <Loader />}
        </FormWrapper>
    );
};

export default Login;
