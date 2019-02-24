import { login, logout, register } from '@/api/login'
import { removeToken } from '@/utils/auth'
import { setToken } from '../../utils/auth'

const user = {
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          console.log('Token setted')
          setToken('JSESSIONID1')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo.username, userInfo.password).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) {
      removeToken()
      return new Promise((resolve, reject) => {
        logout().then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
