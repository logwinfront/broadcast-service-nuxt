// eslint-disable-next-line import/no-mutable-exports
export let api

const PREFIX_API = '/api'

export default function ({ $axios, redirect }) {
  api = $axios

  $axios.defaults.timeout = 15000

  if (process.client) {
    $axios.setBaseURL(PREFIX_API)
  }

  // Change URL only for server
  if (process.server) {
    $axios.setBaseURL(`${process.env.baseApiUrl}${PREFIX_API}`)
  }

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url, config.params)
  })

  $axios.onError((error) => {
    console.log(error.response.url, error.response)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
