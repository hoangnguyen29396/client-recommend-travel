import * as mutations from './mutation-types'

export default {
  [mutations.PICTURES_FETCHED] (state, pictures) {
    state.pictures = pictures
  },
  [mutations.PICTURE_CREATED] (state, picture) {
    state.pictures.unshift(picture)
  },
  [mutations.PICTURE_DELETED] (state, picture) {
    let pictureIndex = state.pictures.findIndex(_picture => _picture.id === picture.id)
    state.pictures.splice(pictureIndex, 1)
  }
  // [mutations.PLACE_TYPE_CREATED] (state, placeType) {
  //   state.newPlaceType.name = ''
  //   state.placeTypes.unshift(placeType)
  // },
  // [mutations.PLACE_TYPE_UPDATED] (state, placeType) {
  //   let placeTypeIndex = state.placeTypes.findIndex(_placeType => _placeType.id === placeType.id)
  //   state.placeTypes.splice(placeTypeIndex, 1)
  //   state.placeTypes.unshift(placeType)
  // }
}
