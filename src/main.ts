import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

import { Radio, RadioGroup, Field, Icon, Picker, Popup } from 'vant'
Vue.use(Radio)
Vue.use(Field)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Picker)
Vue.use(Popup)
