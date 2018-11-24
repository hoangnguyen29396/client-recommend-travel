import api from '../../../utils/api'
import * as mutations from './mutation-types'

export const fetchPlaceCategories = (context, placeTypeId) => {
  api.get(`/place-type/${placeTypeId}/place-categories`)
    .then(
      response => context.commit(mutations.PLACE_CATEGORIES_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const fetchAllPlaceCategory = (context, placeTypeId) => {
  api.get(`/place-type/${placeTypeId}/place-categories`)
    .then(
      response => context.commit(mutations.ALL_PLACE_CATEGORY_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const createPlaceCategory = (context, data) => {
  data.newPlaceCategory.idPlaceType = data.placeTypeId
  api.post('/place-category', data.newPlaceCategory)
    .then(
      response => context.commit(mutations.PLACE_CATEGORY_CREATED, response.data.data),
      error => console.log(error)
    )
}

export const updatePlaceCategory = (context, placeCategory) => {
  api.put(`/place-category/${placeCategory.id}`, {name: placeCategory.name})
    .then(
      response => context.commit(mutations.PLACE_CATEGORY_UPDATED, response.data.data),
      error => console.log(error)
    )
}

export default {
  fetchPlaceCategories,
  fetchAllPlaceCategory,
  createPlaceCategory,
  updatePlaceCategory
}
