import BaseSerive from './base'

export default class PlaceTypeService extends BaseSerive {
  fetchPlaceCategories (placeTypeId) {
    return new Promise((resolve, reject) => {
      this.request().get(`/place-type/${placeTypeId}/place-categories`)
        .then(resolve)
        .catch(reject)
    })
  }
  createPlaceCategory (placeCategory) {
    return new Promise((resolve, reject) => {
      this.request().post(`/place-category`, placeCategory)
        .then(resolve)
        .catch(reject)
    })
  }
  updatePlaceCategory (placeCategory) {
    return new Promise((resolve, reject) => {
      this.request().put(`/place-category/${placeCategory.id}`, {name: placeCategory.name})
        .then(resolve)
        .catch(reject)
    })
  }
}
