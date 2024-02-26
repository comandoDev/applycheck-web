export const getFormattedDate = (stringDate: Date, endTime?: boolean) => {
    const date = new Date(stringDate)

    let hour = date.getHours()
    const minutes = date.getMinutes()

    if (endTime) hour = hour + 3

    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')

    return `${formattedHour}:${formattedMinutes}`
}