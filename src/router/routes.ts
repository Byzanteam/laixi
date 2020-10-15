export default [
  {
    path: '/laixi/home',
    name: 'home',
    component: () => import(/* webpackChunkName:'home' */ '@/views/home.vue')
  },
  {
    path: '/laixi/basis',
    name: 'basis',
    component: () => import(/* webpackChunkName:'basis' */ '@/views/basis.vue')
  },
  {
    path: '/laixi/code',
    name: 'code',
    component: () => import(/* webpackChunkName:'code' */ '@/login/code.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]
