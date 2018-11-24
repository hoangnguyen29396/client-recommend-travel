import api from '../../../utils/api'
import * as mutations from './mutation-types'

export const fetchLocations = (context, currentPage) => {
  api.get(`/locations/${currentPage}`)
    .then(
      response => context.commit(mutations.LOCATIONS_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const createLocation = (context, location) => {
  api.post('/create-location-non-picture', location)
    .then(
      response => context.commit(mutations.LOCATION_CREATED, response.data.data),
      error => console.log(error)
    )
}

export const fetchLocation = (context, loctionId) => {
  api.get(`/api/location/${loctionId}`)
    .then(
      response => context.commit(mutations.LOCATION_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const updateLocation = (context, data) => {
  api.put(`/web/update-location/${data.locationId}`, data.location)
    .then(
      response => context.commit(mutations.LOCATION_UPDATED, response.data.data),
      error => console.log(error)
    )
}

export default {
  fetchLocations,
  createLocation,
  fetchLocation,
  updateLocation
}
