import BaseSerive from './base'

export default class LocationService extends BaseSerive {
  constructor (resource = 'locations') {
    super(resource)
  }

  fetchLocations (currentPage) {
    return new Promise((resolve, reject) => {
      this.request().get(`/locations/${currentPage}`)
        .then(resolve)
        .catch(reject)
    })
  }
}
