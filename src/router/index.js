import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/registration', component: () => import('@/views/Registration'), hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/phonebook',
    hidden: true,
    children: [{
      path: 'Phonebook',
      component: () => import('@/views/Phonebook')
    }]
  },
  {
    path: '/phonebook',
    component: Layout,
    children: [
      {
        path: '/phonebook',
        name: 'phonebook',
        component: () => import('@/views/Phonebook'),
        meta: { title: 'Phonebook', icon: 'example' }
      }
    ]
  },
  { path: '/', redirect: '/login' },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
