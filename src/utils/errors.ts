export const normalizeErrors = (errorData: object) => {
    return Object.entries(errorData).map((error) => {
        return `${error[0]} ${error[1]}`
    })
}