import api from '../../../utils/api'
import * as mutations from './mutation-types'

export const fetchPlaceTypes = (context) => {
  api.get('/place-types')
    .then(
      response => context.commit(mutations.PLACE_TYPES_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const fetchPlaceType = (context, placeTypeId) => {
  api.get(`/place-type/${placeTypeId}`)
    .then(
      response => context.commit(mutations.PLACE_TYPE_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const createPlaceType = (context, newPlaceType) => {
  api.post('/place-type', newPlaceType)
    .then(
      response => context.commit(mutations.PLACE_TYPE_CREATED, response.data.data),
      error => console.log(error)
    )
}

export const updatePlaceType = (context, placeType) => {
  api.put(`/place-type/${placeType.id}`, {name: placeType.name})
    .then(
      response => context.commit(mutations.PLACE_TYPE_UPDATED, response.data.data),
      error => console.log(error)
    )
}

export default {
  fetchPlaceTypes,
  fetchPlaceType,
  createPlaceType,
  updatePlaceType
}
