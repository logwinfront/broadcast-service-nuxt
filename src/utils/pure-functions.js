export const chainResponse = (promise) => promise.then((res) => res.data)

export const sliceIntoChunks = (arr, chunkSize) => {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

export const timestampToApiFormat = (date) => {
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  return `${year}-${month}-${day}T00:00:00+03:00`
}

export const getDateParams = (timestamp) => {
  const firstDate = new Date(timestamp)

  const dateForApiFrom = timestampToApiFormat(firstDate)
  const dateForApiTo = timestampToApiFormat(
    firstDate.setDate(firstDate.getDate() + 1)
  )

  return {
    datetime_start__gte: dateForApiFrom,
    datetime_start__lt: dateForApiTo,
  }
}
