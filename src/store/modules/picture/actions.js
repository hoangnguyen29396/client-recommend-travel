import api from '../../../utils/api'
import * as mutations from './mutation-types'

export const fetchPictures = (context, locationId) => {
  api.get(`/api/location/${locationId}/pictures`)
    .then(
      response => context.commit(mutations.PICTURES_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const createPicture = (context, data) => {
  let formData = new FormData()
  formData.append('file', data.file)
  formData.append('idLocation', data.locationId)
  api.post('/api/upload-image-for-location', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(
      response => context.commit(mutations.PICTURE_CREATED, response.data.data),
      error => console.log(error)
    )
}

export const deletePicture = (context, picture) => {
  api.delete(`api/delete-picture/${picture.id}`)
    .then(
      response => context.commit(mutations.PICTURE_DELETED, picture),
      error => console.log(error)
    )
}

// export const updatePlaceType = (context, placeType) => {
//   api.put(`/place-type/${placeType.id}`, {name: placeType.name})
//     .then(
//       response => context.commit(mutations.PLACE_TYPE_UPDATED, response.data.data),
//       error => console.log(error)
//     )
// }

export default {
  fetchPictures,
  createPicture,
  deletePicture
}
