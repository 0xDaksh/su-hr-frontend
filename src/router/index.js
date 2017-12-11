import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Hotels from '@/components/hotels'
import Login from '@/components/login'
import Logout from '@/components/logout'
import Hotel from '@/components/hotel'

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
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/hotels/:id',
      component: Hotel,
      name: 'Hotel'
    }
  ]
})
