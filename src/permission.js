import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress configuration

const whiteList = ['/login', '/registration']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/user/phonebook') {
    if (getToken()) {
      next()
      NProgress.done()
    } else next('/login')
  }
  if (to.path === '/user') {
    if (getToken()) {
      next()
      NProgress.done()
    } else next('/login')
  }
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    if (to.path === '/login') {
      if (getToken()) {
        next('/user') // 否则全部重定向到登录页
        NProgress.done()
      } else {
        next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
