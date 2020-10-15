import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const name = to.name
  // 没有人员信息，触发登录
  const userName = localStorage.getItem('user_name')
  if (!userName) {
    sessionStorage.setItem('callback', JSON.stringify(name))
    // router.push({ name: 'code' })
  }
  next()
})

export default router
