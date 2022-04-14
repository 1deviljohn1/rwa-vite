import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useFetch = async (url: string) => {
    let data!: null | object
    let error!: null | string

    await axios
        .get(API_URL + url)
        .then((res) => {
            data = res.data
        })
        .catch((err) => {
            error = err
        })

    return { data, error }
}
