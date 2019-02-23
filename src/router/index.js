import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/registration', component: () => import('@/views/Registration'), hidden: true },
  {
    path: '/Phonebook',
    component: Layout,
    redirect: '/phonebook',
    children: [{
      path: 'Phonebook',
      component: () => import('@/views/Phonebook'),
      meta: { title: 'Phonebook', icon: 'example' }
    }]
  },
  { path: '/', redirect: '/login' },
  { path: '*', redirect: '/login' }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

