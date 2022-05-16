export const chainResponse = (promise) => promise.then((res) => res.data)

export const sliceIntoChunks = (arr, chunkSize) => {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}
