import http from '../http'

const getCityList = () => http({ url: `https://m.maizuo.com/gateway?k=5245917`,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157767552912884902040"}',
    'X-Host': 'mall.film-ticket.city.list'
  } })

export default getCityList
