import axios from 'axios'
import { baseURL } from '@/config'
import { getAccessToken } from '@/services/auth'

export default class BaseSerive {
  constructor (resource) {
    this.resource = resource
  }

  request () {
    return axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${getAccessToken()}`
      }
    })
  }

  index (options = {}) {
    const params = { ...options }
    return new Promise((resolve, reject) => {
      this.request().get(`${this.resource}`, {params})
        .then(resolve)
        .catch(reject)
    })
  }

  show (id) {
    return new Promise((resolve, reject) => {
      this.request().get(`${this.resource}/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }

  update (id, data, options = {}) {
    return new Promise((resolve, reject) => {
      this.request().put(`${this.resource}/${id}`, data, options)
        .then(resolve)
        .catch(reject)
    })
  }

  create (data, options = {}) {
    return new Promise((resolve, reject) => {
      this.request().post(`${this.resource}`, data, options)
        .then(resolve)
        .catch(reject)
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.request().delete(`${this.resource}/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}
