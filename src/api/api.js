import http from '../unit/http'
let headerV4 = {
  Authorization:
    '83caad21f39586ec113abce400b3df32c07b39957496fd058d55237ffbc5861a:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lc3BhY2VfaWQiOjF9.KrlsVFqiw6TC9owojoEKRRAzChgKqj9tJOk9oMvSDS8'
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
  }
}
