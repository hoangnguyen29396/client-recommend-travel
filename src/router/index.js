import Vue from 'vue'
import Router from 'vue-router'
import PlaceType from '../views/place_type/Index.vue'
import PlaceTypeDetail from '../components/place_type/PlaceTypeDetail.vue'
import PlaceCategoryDetail from '../components/place_type/place_category/PlaceCategoryDetail.vue'
import Location from '../views/location/Index.vue'
import LocationDetail from '../components/location/LocationDetail.vue'
import CreateUpdateLocation from '../components/location/CreateUpdateLocation.vue'
import PictureDetail from '../components/location/picture/PictureDetail.vue'
import EvaluationDetail from '../components/location/evaluation/EvaluationDetail.vue'
import User from '../views/user/Index.vue'
import CreateUpdateUser from '../components/user/CreateUpdateUser.vue'
import UserDetail from '../components/user/UserDetail.vue'
import Login from '../views/login/Index.vue'
import ActionDetail from '../components/user/action/ActionDetail.vue'
import { isLoggedIn } from '@/services/auth'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/place-types',
      component: PlaceType,
      children: [
        {
          path: '',
          name: 'viewPlaceTypes',
          component: PlaceTypeDetail,
          meta: {
            requireAuth: true
          }
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
          component: PlaceCategoryDetail,
          meta: {
            requireAuth: true
          }
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
          component: LocationDetail,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'changeLocation',
          props: true,
          component: CreateUpdateLocation,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/locations/:locationId',
      component: Location,
      children: [
        {
          path: 'pictures',
          name: 'viewPictures',
          props: true,
          component: PictureDetail,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'evaluation',
          name: 'viewEvaluation',
          props: true,
          component: EvaluationDetail,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '',
          name: 'editLocation',
          props: true,
          component: CreateUpdateLocation,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/users',
      component: User,
      children: [
        {
          path: '',
          name: 'viewUsers',
          component: UserDetail,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'add',
          name: 'addUser',
          component: CreateUpdateUser,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/users/:userId',
      component: User,
      children: [
        {
          path: 'actions',
          name: 'viewActions',
          props: true,
          component: ActionDetail,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  if (requiresAuth) {
    if (!isLoggedIn()) {
      return next({name: 'login'})
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default {
  router
}
