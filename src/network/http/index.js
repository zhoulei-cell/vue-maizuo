import http from './ajax'
import Loading from '@/plugins/Loading'

http.request = function(config) {
  Loading.show()
  return config
}

http.response = function(response) {
  Loading.hide()
  return response
}

export default http
