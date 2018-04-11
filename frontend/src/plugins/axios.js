import axios from 'axios'

export default ({
  app,
  router,
  Vue
}) => {
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response
  }, function (error) {
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
