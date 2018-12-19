import BaseSerive from './base'

export default class PlaceTypeService extends BaseSerive {
  constructor (resource = 'place-types') {
    super(resource)
  }
  fetchPlaceTypes () {
    return new Promise((resolve, reject) => {
      this.request().get(`/place-types`)
        .then(resolve)
        .catch(reject)
    })
  }
  fetchPlaceType (placeTypeId) {
    return new Promise((resolve, reject) => {
      this.request().get(`/place-type/${placeTypeId}`)
        .then(resolve)
        .catch(reject)
    })
  }
  createPlaceType (placeType) {
    return new Promise((resolve, reject) => {
      this.request().post(`/place-type`, placeType)
        .then(resolve)
        .catch(reject)
    })
  }
  updatePlaceType (placeType) {
    return new Promise((resolve, reject) => {
      this.request().put(`/place-type/${placeType.id}`, {name: placeType.name})
        .then(resolve)
        .catch(reject)
    })
  }
}
