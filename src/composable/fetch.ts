import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const useFetch = (url: string) => {
    const data = ref(null)
    const error = ref(null)

    axios
        .get(API_URL + url)
        .then((res) => {
            data.value = res.data
        })
        .catch((err) => {
            error.value = err
        })

    return { data, error }
}
