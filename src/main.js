// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Index from '@/components/Index'
import router from './router/index'
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted:function (){
    this.$Loading.config({
      color: '#ff9900',
      failedColor: '#f0ad4e',
      height: 5
  });
  }
})
