import BaseSerive from './base'

export default class PictureService extends BaseSerive {
  fetchPictures (locationId) {
    return new Promise((resolve, reject) => {
      this.request().get(`/api/location/${locationId}/pictures`)
        .then(resolve)
        .catch(reject)
    })
  }
  createPicture (formData) {
    return new Promise((resolve, reject) => {
      this.request().post(`/api/upload-image-for-location`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(resolve)
        .catch(reject)
    })
  }
  deletePicture (picture) {
    return new Promise((resolve, reject) => {
      this.request().delete(`api/delete-picture/${picture.id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}
