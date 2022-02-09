import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://api.realworld.io/api'

export default (url) => {
    const data = ref(null)
    const error = ref(null)

    axios
        .get(BASE_URL + url)
        .then((res) => {
            data.value = res.data
        })
        .catch((err) => {
            error.value = err
        })

    return { data, error }
}
