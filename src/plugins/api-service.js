export default function ({ $axios }) {
  return {
    slider: {
      getItems: () => $axios.get(),
    },
  }
}
