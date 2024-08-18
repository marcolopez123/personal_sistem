export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  // Set baseURL to something different
  let url = 'https://qapersonal.digitalconect.cl/apisgconta/public/api/'
  api.url = url
  api.setBaseURL(url)


  // Inject to context as $apin
  inject('api', api)

  
}
