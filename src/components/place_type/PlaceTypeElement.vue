<template>
  <tr :class="{editing: placeType == editedPlaceType}" v-cloak>
    <td>
      <span class="view" @dblclick="editPlaceType(placeType)">{{ placeType.name }}</span>
      <input v-model="placeType.name" v-place-type-focus="placeType == editedPlaceType" type="text" class="edit col-lg-4 form-control">
    </td>
    <td>
      <button type="button" @click="updatePlaceType(placeType)" class="btn btn-success edit" title="Save"
        v-show="isAction('UPDATE_PLACETYPE')"><i class="fa fa-save"></i></button>
      <button type="button" @click="cancelEditPlaceType(placeType)" class="btn btn-warning edit" title="Cancel"><i class="fa fa-backward"></i></button>
      <router-link class="btn btn-success js-sweetalert view"  :to="{ name: 'viewPlaceCategories', params: { placeTypeId: placeType.id }}" title="Place Categories"><i class="fa fa-cube"></i></router-link>
      <button type="button" class="btn btn-danger js-sweetalert view"
        title="Delete"
        @click="deletePlaceType"
        v-show="isAction('DEL_PLACETYPE')">
        <i class="fa fa-trash-o"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import PlaceTypeService from '@/services/place-type'
import { isAction } from '@/services/auth'

export default {
  props: ['placeType'],
  data: function () {
    return {
      editedPlaceType: null
    }
  },
  methods: {
    editPlaceType: function (placeType) {
      this.beforeEditCache = placeType.name
      this.editedPlaceType = placeType
    },
    updatePlaceType: function (placeType) {
      this.$emit('update-place-type', placeType)
    },
    cancelEditPlaceType: function (placeType) {
      this.editedPlaceType = null
      placeType.name = this.beforeEditCache
    },
    deletePlaceType () {
      const placeTypeService = new PlaceTypeService('/place-type')
      placeTypeService.delete(this.placeType.id)
        .then(response => {
          if (response.data.result_code === 500) {
            alert('This place category can not delete')
          } else {
            this.$emit('delete-place-type', this.placeType)
          }
        })
        .catch(() => {
          alert('This place category can not delete')
        })
    },
    isAction (actionName) {
      return isAction(actionName)
    }
  },
  directives: {
    'place-type-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
