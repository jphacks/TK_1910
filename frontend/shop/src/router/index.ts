import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/category', component: () => import('../components/Category/List.vue') },
      { path: '/category/add', component: () => import('../components/Category/Edit.vue') },
      { path: '/category/:id', component: () => import('../components/Category/Edit.vue') },
      { path: '/table', component: () => import('../components/Table/List.vue') },
      { path: '/table/add', component: () => import('../components/Table/Edit.vue') },
      { path: '/table/:id', component: () => import('../components/Table/Edit.vue') },
      { path: '/menu', component: () => import('../components/Menu/List.vue') },
      { path: '/menu/add', component: () => import('../components/Menu/Edit.vue') },
      { path: '/menu/:id', component: () => import('../components/Menu/Edit.vue') },
      { path: '/user', component: () => import('../components/User/List.vue') },
      { path: '/user/add', component: () => import('../components/User/Edit.vue') },
      { path: '/user/:id', component: () => import('../components/User/Edit.vue') },
      { path: '/order', component: () => import('../components/Order/List.vue') },
      { path: '/order/:id', component: () => import('../components/Order/List.vue') },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
