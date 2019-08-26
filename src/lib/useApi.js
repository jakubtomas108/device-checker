import axios from "axios";

export const useApi = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const api = axios.create({
        baseURL: "https://js-test-api.etnetera.cz/api/v1",
        headers: {
            "content-type": "application/json",
            "auth-token": user && user.token
        }
    });

    return {
        logIn: (email, password) =>
            api.post("/login", { login: email, password: password }),
        getAllPhones: () => api.get("/phones"),
        borrowPhone: phoneId => api.post(`/phones/${phoneId}/borrow`),
        returnPhone: phoneId => api.post(`/phones/${phoneId}/return`),
        createNewDevice: newDeviceInfo => api.post("/phones", newDeviceInfo)
    };
};
