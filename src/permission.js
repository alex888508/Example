import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/registration']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    }
  } else if (to.path === '/Phonebook') {
    next({ path: '/login' })
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else if (to.path === '/registration') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
