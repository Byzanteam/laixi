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

import { Radio, Loading, RadioGroup, Field, Icon, Picker, Popup, Toast } from 'vant'
Vue.use(Radio)
Vue.use(Field)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Loading)
Vue.use(Toast)
