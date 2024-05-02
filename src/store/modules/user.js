import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login

  login({ commit }, userInfo) {
    console.log('login result :')
    const { username, password  } = userInfo
    return new Promise((resolve, reject) => {
        let temp = {
          username: username.trim(),
          password: password.trim(), //md5(password.trim()),
          code: 'code', //验证码
          codeKey: 'codeKey' //验证码唯一標識
        }

        console.log(temp)
        console.log('login temp')
    login(temp).then(
      async response => {
      console.log('login resultx :'+ JSON.stringify(response))
      const { code,data,msg } = response
      console.log(response)
      if(code === 0){
        commit('SET_TOKEN', data.AccessToken)
        setToken(data.AccessToken)
        resolve()
      }
      else{
        reject(msg)
      }
    }

  ).catch(error => {
      console.log('login err')
      console.log(error)
      reject(error)
    })
    console.log('login end')


  })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log("getInfo")
        console.log(data)
        //userName 要和後臺定義的一致，大小寫，首個小寫
        const { roles, userName, avatar } = data
        console.log(userName)
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

