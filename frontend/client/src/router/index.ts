import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: '/order/detail/:id', component: () => import('../components/OrderDetail.vue') },
      { path: '/order/:id', component: () => import('../components/OrderView.vue') },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
