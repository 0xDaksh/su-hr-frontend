import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Hotels from '@/components/hotels'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hotels',
      name: 'Hotels',
      component: Hotels
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
