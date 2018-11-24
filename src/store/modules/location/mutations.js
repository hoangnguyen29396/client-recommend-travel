import * as mutations from './mutation-types'

export default {
  [mutations.LOCATIONS_FETCHED] (state, data) {
    state.sumPage = data.sumPage
    state.locations = data.listLocationProfieDTO
  },
  [mutations.LOCATION_CREATED] (state, location) {
    console.log(location)
    // window.history.go(-1)
  },
  [mutations.LOCATION_FETCHED] (state, location) {
    state.location = location
  },
  [mutations.LOCATION_UPDATED] (state, location) {
    console.log(location)
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
