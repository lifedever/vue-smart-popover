import Vue from 'vue'
import App from './App.vue'
import SmartPopover from '../src'

Vue.config.productionTip = false
Vue.use(SmartPopover)

new Vue({
  render: h => h(App),
}).$mount('#app')
