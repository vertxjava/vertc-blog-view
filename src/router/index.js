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
  ]
})
