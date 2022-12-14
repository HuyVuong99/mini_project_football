import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginView',
    component: () => import('../components/LoginVue.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
    {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/HomeVue.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../components/RankVue.vue')
  },
    {
    path: '/bets',
    name: 'Bets',
    component: () => import('../components/BetsVue.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
