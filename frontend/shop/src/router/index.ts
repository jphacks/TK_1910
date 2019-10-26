import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
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
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
