import * as mutations from './mutation-types'

export default {
  [mutations.PLACE_TYPES_FETCHED] (state, placeTypes) {
    state.placeTypes = placeTypes
  },
  [mutations.PLACE_TYPE_FETCHED] (state, placeType) {
    state.placeType = placeType
  },
  [mutations.PLACE_TYPE_CREATED] (state, placeType) {
    state.newPlaceType.name = ''
    state.placeTypes.unshift(placeType)
  },
  [mutations.PLACE_TYPE_UPDATED] (state, placeType) {
    let placeTypeIndex = state.placeTypes.findIndex(_placeType => _placeType.id === placeType.id)
    state.placeTypes.splice(placeTypeIndex, 1)
    state.placeTypes.unshift(placeType)
  }
}
