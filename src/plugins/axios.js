// eslint-disable-next-line import/no-mutable-exports
export let api

export default function ({ $axios, redirect }) {
  api = $axios

  $axios.defaults.timeout = 8000

  if (process.client) {
    $axios.setBaseURL('/api')
  }

  // Change URL only for server
  if (process.server) {
    $axios.setBaseURL('https://api.sportefir.com/api')
  }

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    console.log(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
