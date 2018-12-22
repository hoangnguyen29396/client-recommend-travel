<template>
  <tr>
    <td>{{ location.name }}</td>
    <td>{{ location.introduction }}</td>
    <td>{{ location.placeCategory }}</td>
    <td>{{ location.address }}</td>
    <td>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'viewPictures', params: { locationId: location.id }}" title="Pictures"><i class="fa fa-image"></i></router-link>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'editLocation', params: { locationId: location.id }}" title="Edit"
        v-show="isAction('UPDATE_LOCATION')"><i class="fa fa-edit"></i></router-link>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'viewEvaluation', params: { locationId: location.id }}" title="Evaluation"><i class="fa fa-star"></i></router-link>
      <button type="button" class="btn btn-success js-sweetalert"
        title="deactivate"
        v-if="location.status === '1'"
        @click="changeStatus">
        <i class="fa fa-check"></i>
      </button>
      <button type="button" class="btn btn-danger js-sweetalert"
        title="activate"
        v-else
        @click="changeStatus">
        <i class="fa fa-close"></i>
      </button>
    </td>
  </tr>
</template>
<script>
import LocationService from '@/services/location'
import { isAction } from '@/services/auth'

export default {
  props: ['location'],
  methods: {
    changeStatus () {
      const locationService = new LocationService('/api/status-of-location')
      locationService.update(this.location.id)
        .then(response => {
          if (this.location.status === '1') {
            this.location.status = '0'
          } else {
            this.location.status = '1'
          }
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    isAction (actionName) {
      return isAction(actionName)
    }
  }
}
</script>
