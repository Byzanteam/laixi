export default [
  {
    path: '/laixi',
    name: 'home',
    component: () => import(/* webpackChunkName:'home' */ '@/views/home.vue')
  },
  {
    path: '/laixi/about',
    name: 'about',
    component: () => import(/* webpackChunkName:'about' */ '@/views/about.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/home.vue')
  }
]
