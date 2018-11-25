import BaseSerive from './base'

export default class UserService extends BaseSerive {
  fetchUsers (currentPage) {
    return new Promise((resolve, reject) => {
      this.request().get(`/api/users/${currentPage}`)
        .then(resolve)
        .catch(reject)
    })
  }
  createUser (user) {
    return new Promise((resolve, reject) => {
      this.request().post(`/api/user`, user)
        .then(resolve)
        .catch(reject)
    })
  }
}
