import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ApiMethods } from '../types'

const API_URL = import.meta.env.VITE_API_URL

export const api = async (method: ApiMethods, url: string, data: object | null = null, token: string | null = null) => {
    let responseData!: { [key: string]: object }
    let responseError!: AxiosError

    const params: AxiosRequestConfig = {
        method,
        url: API_URL + url,
    }

    if (data !== null) {
        const payload = method === ApiMethods.Get ? 'params' : 'data'
        params[payload] = data
    }

    if (token !== null) {
        params.headers = {
            Authorization: `Token ${token}`,
        }
    }

    await axios(params)
        .then((res: AxiosResponse) => {
            responseData = res.data
        })
        .catch((err: AxiosError) => {
            responseError = err
        })

    return { responseData, responseError }
}
