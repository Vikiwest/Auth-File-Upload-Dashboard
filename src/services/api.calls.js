import axios from "axios";
import { baseUrl } from "../utils/api.env";
import { HttpConstants } from "../utils/stores";

export const apiCall = async (httpVerb, payload, param) => {
    try {
        let response;
        const header = {
            "Content-Type": "application/json",
            "Method": httpVerb
        }

        switch (httpVerb) {
            case HttpConstants.GET:
                response = await axios.get(baseUrl, header);
                break;
            case HttpConstants.POST:
                response = await axios.post(baseUrl, payload, header);
                break;
            case HttpConstants.PATCH:
                response = await axios.patch(`${baseUrl}/${param}`, payload, header);
                break;
            case HttpConstants.PUT:
                response = await axios.put(`${baseUrl}/${param}`, payload, header);
                break;
            case HttpConstants.DELETE:
                response = await axios.delete(`${baseUrl}/${param}`, header);
                break;
            default:
                response = "Invalid HTTP verb"
                break;
        }
        return response;

    } catch (err) {
        console.error(`error from ${httpVerb} request!`, err);
    }
}