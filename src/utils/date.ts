export const ISOtoDate = (ISOString: string) => {
    const date = new Date(ISOString)
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return dateTimeFormat.format(date)
}
