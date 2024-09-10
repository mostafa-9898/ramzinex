import axios from "axios";


export const api = axios.create({
    baseURL: "https://publicapi.ramzinex.com/exchange/api/v1.0/exchange"
})


api.interceptors.response.use(
    function (response) {
        // console.log('Response:', response);
        return response;
    },
    function (error) {
        if (error) {
            console.log("interceptors error=>", error)
            window.location.replace("/error")
        }
        return Promise.reject(error);
    }
);