import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => {
  require.ensure(['../components/Index.vue'], () => {
      resolve(require('../components/Index.vue'))
  })
}

const Detail = resolve => {
  require.ensure(['../components/Detail.vue'], () => {
      resolve(require('../components/Detail.vue'))
  })
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ],
  // 定义router跳转后，页面回到顶部
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
