import axios, { AxiosError } from 'axios'
import { ApiMethods } from '../types'

const API_URL = import.meta.env.VITE_API_URL

export const api = async (method: ApiMethods, url: string, data?: object) => {
    let responseData!: undefined | object
    let responseError!: undefined | AxiosError

    const params = {
        method,
        url: API_URL + url,
        data,
    }

    await axios(params)
        .then((res) => {
            responseData = res.data
        })
        .catch((err) => {
            responseError = err
        })

    return { responseData, responseError }
}
