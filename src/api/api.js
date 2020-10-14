import http from '../unit/http'
let headerV4 = {
  Authorization:
    '83caad21f39586ec113abce400b3df32c07b39957496fd058d55237ffbc5861a:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2VfaWQiOjF9.KrlsVFqiw6TC9owojoEKRRAzChgKqj9tJOk9oMvSDS8'
}
let headerSQL = {
  Authorization:
    'gid://slp-table-mapper/Namespace/1&eyJhbGciOiJIUzI1NiJ9.eyJnaWQiOiJnaWQ6Ly9za3lsYXJrL05hbWVzcGFjZS8xIn0.Zk6wFWwO1LcnHaGoRpl3oTpnYywRnQrPQrLp_SYyslw',
  'Content-Type': 'application/json'
}

// admin
export default {
  // 登录oauth
  getMagnateOauthAPI() {
    return http.get('/magnate/oauth')
  },
  getUserAPI(token) {
    return http.get(`/api/v1/user?access_token=` + token)
  },
  // 渲染表单
  getFormAPI(formID) {
    return http.get(`/api/v4/forms/${formID}`, '', headerV4)
  },
  // 发送数据
  postFormAPI(formID, data) {
    return http.post(`/api/v4/forms/${formID}/responses`, data, headerV4)
  },
  // 逆地址编码
  baiduMapAPI(location) {
    return http.get(`/v3/?ak=vZ2qzqpvBYXFibWK5oYnUaK52fWMlbwm&output=json&coordtype=wgs84ll&location=${location}`)
  },
  // SQL查询
  postSqlJsonAPI(data) {
    return http.post(`/api/table_mappers/json_api/execute_sql`, data, headerSQL)
  }
}
