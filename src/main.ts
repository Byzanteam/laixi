import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

import { Radio, Loading, RadioGroup, Field, Icon, Picker, Popup, Toast, Uploader } from 'vant'
Vue.use(Radio)
Vue.use(Field)
Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Uploader)
