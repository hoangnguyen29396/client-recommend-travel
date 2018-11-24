import Vue from 'vue'
import Router from 'vue-router'
import PlaceType from '../views/place_type/Index.vue'
import PlaceTypeDetail from '../components/place_type/PlaceTypeDetail.vue'
import PlaceCategoryDetail from '../components/place_type/place_category/PlaceCategoryDetail.vue'
import Location from '../views/location/Index.vue'
import LocationDetail from '../components/location/LocationDetail.vue'
import AddLocation from '../components/location/AddLocation.vue'
import EditLocation from '../components/location/EditLocation.vue'
import PictureDetail from '../components/location/picture/PictureDetail.vue'
import EvaluationDetail from '../components/location/evaluation/EvaluationDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/place-types',
      component: PlaceType,
      children: [
        {
          path: '',
          name: 'viewPlaceTypes',
          component: PlaceTypeDetail
        }
      ]
    },
    {
      path: '/place-type/:placeTypeId',
      component: PlaceType,
      children: [
        {
          path: 'place-categories',
          name: 'viewPlaceCategories',
          props: true,
          component: PlaceCategoryDetail
        }
      ]
    },
    {
      path: '/locations',
      component: Location,
      children: [
        {
          path: '',
          name: 'viewLocations',
          component: LocationDetail
        },
        {
          path: 'add',
          name: 'addLocation',
          component: AddLocation
        }
      ]
    },
    {
      path: '/location/:locationId',
      component: Location,
      children: [
        {
          path: 'pictures',
          name: 'viewPictures',
          props: true,
          component: PictureDetail
        },
        {
          path: 'evaluation',
          name: 'viewEvaluation',
          props: true,
          component: EvaluationDetail
        },
        {
          path: 'edit',
          name: 'editLocation',
          props: true,
          component: EditLocation
        }
      ]
    }
  ]
})
