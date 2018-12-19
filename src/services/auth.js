import axios from 'axios'
import { baseURL } from '@/config'

export const login = (formData) => (
  new Promise((resolve, reject) => {
    axios.post(`${baseURL}/api/login-web`, formData)
      .then(
        res => resolve(res),
        error => reject(error)
      )
  })
)

export const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken')
}

export const isAction = (actionName) => {
  let k = 0
  if (localStorage.getItem('actions')) {
    JSON.parse(localStorage.getItem('actions')).forEach(action => {
      if (action.name === actionName) {
        k = k + 1
      }
    })
  }
  return (k !== 0)
}

export const setAuthToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken)
}

export const setActions = (actions) => {
  localStorage.setItem('actions', JSON.stringify(actions))
}

export const getAccessToken = () => localStorage.getItem('accessToken')

export const getActions = () => JSON.parse(localStorage.getItem('actions'))

export const removeAuthToken = () => {
  localStorage.removeItem('accessToken')
}

export default {
  login,
  setAuthToken,
  isLoggedIn,
  getAccessToken,
  removeAuthToken,
  setActions,
  getActions,
  isAction
}
