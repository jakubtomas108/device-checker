import React, { useState, useLayoutEffect } from "react";
import { Router, navigate } from "@reach/router";
import { createGlobalStyle } from "styled-components";

import Header from "./components/shared/Header";
import Login from "./components/pages/Login";
import DevicesList from "./components/pages/DevicesList";
import CreateDevice from "./components/pages/CreateDevice";

const GlobalStyles = createGlobalStyle`
    body {
        background: whitesmoke;
        margin-top: 5rem;
    }
`;

const App = () => {
    const [userData, setUserData] = useState({});

    useLayoutEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (user && user.token) {
            setUserData(user);

            user.type === "admin" && window.location.pathname === "/create-device"
                ? navigate("/create-device")
                : navigate("/devices-list");
        } else {
            navigate("/");
        }
    }, []);

    const handleLogOut = () => {
        navigate("/");
        sessionStorage.removeItem("user");
        setUserData({});
    };

    return (
        <div>
            <GlobalStyles />
            <Header
                userData={userData}
                handleLogOut={handleLogOut}
                navigateToCreateDevice={() => navigate("/create-device")}
            />

            <Router>
                <Login path="/" setUserData={setUserData} />
                <DevicesList path="devices-list" userData={userData} />
                <CreateDevice path="create-device" />
            </Router>
        </div>
    );
};

export default App;
