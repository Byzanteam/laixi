export default [
  {
    path: '/laixi',
    name: 'home',
    component: () => import(/* webpackChunkName:'home' */ '@/views/home.vue')
  },
  {
    path: '/laixi/basis',
    name: 'basis',
    component: () => import(/* webpackChunkName:'basis' */ '@/views/basis.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/home.vue')
  }
]
