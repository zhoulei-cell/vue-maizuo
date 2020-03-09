import http from '../http'

const getBannerList = () => http({
  url: `https://m.maizuo.com/gateway?type=2&cityId=510500&k=8370311`,
  headers: { 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157767552912884902040","bc":"510500"}',
    'X-Host': 'mall.cfg.common-banner' } })

const getMovieList = (pageNum, type) => http({
  url: `https://m.maizuo.com/gateway?cityId=510500&pageNum=${pageNum}&pageSize=10&type=${type}&k=6357119'`,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"157767552912884902040","bc":"510500"}',
    'X-Host': 'mall.film-ticket.film.list'
  } })

export default {
  getBannerList,
  getMovieList
}
