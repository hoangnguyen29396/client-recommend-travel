import * as mutations from './mutation-types'

export default {
  [mutations.PLACE_CATEGORIES_FETCHED] (state, placeCategories) {
    state.placeCategories = placeCategories
  },
  [mutations.ALL_PLACE_CATEGORY_FETCHED] (state, placeCategories) {
    state.placeCategories = placeCategories
  },
  [mutations.PLACE_CATEGORY_CREATED] (state, placeCategory) {
    state.newPlaceCategory.name = ''
    state.placeCategories.unshift(placeCategory)
  },
  [mutations.PLACE_CATEGORY_UPDATED] (state, placeCategory) {
    let placeCategoryIndex = state.placeCategories.findIndex(_placeCategory => _placeCategory.id === placeCategory.id)
    state.placeCategories.splice(placeCategoryIndex, 1)
    state.placeCategories.unshift(placeCategory)
  }
}
