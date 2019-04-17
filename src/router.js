import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Day from './views/Day.vue'
import Week from './views/Week.vue'
import Login from './views/Login.vue'
import EditEvent from './views/EditEvent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/day',
      name: 'day',
      component: Day
    },
    {
      path: '/week',
      name: 'week',
      component: Week
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
{
  path: '/edit',
  name: 'EditEvent',
  component: EditEvent
}
  ]
})
