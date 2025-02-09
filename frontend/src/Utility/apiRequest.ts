import axios, { AxiosResponse } from "axios"
import { ApiRequestParams } from "../Models/API_REQUEST_PARAMS";
import { axiosInstance } from "./axios";



export const apiRequest = async ({
    method, url, data, headers, params,
}: ApiRequestParams): Promise<AxiosResponse["data"]> => {
    try {
        let response = await axiosInstance({
            method,
            url: import.meta.env.VITE_BASE_URL + url,
            data
        })
        return { error: null, response: response?.data }
    } catch (error: unknown) {
        console.error(error);
        return { error, response: null }
    }
} 