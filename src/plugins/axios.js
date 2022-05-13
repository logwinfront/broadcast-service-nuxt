export default function ({ $axios, redirect }) {
  if (process.client) {
    console.log('client')
    $axios.setBaseURL('https://api.sportefir.com')
  }

  // Change URL only for server
  if (process.server) {
    console.log('server')
    $axios.setBaseURL('https://api.sportefir.com')
  }

  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
