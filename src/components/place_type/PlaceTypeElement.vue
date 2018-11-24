<template>
  <tr :class="{editing: placeType == editedPlaceType}" v-cloak>
    <td>
      <span class="view" @dblclick="editPlaceType(placeType)">{{ placeType.name }}</span>
      <input v-model="placeType.name" v-place-type-focus="placeType == editedPlaceType" type="text" class="edit col-lg-4 form-control">
    </td>
    <td>
      <button type="button" @click="updatePlaceType(placeType)" class="btn btn-success edit" title="Save"><i class="fa fa-save"></i></button>
      <button type="button" @click="cancelEditPlaceType(placeType)" class="btn btn-warning edit" title="Cancel"><i class="fa fa-backward"></i></button>
      <router-link class="btn btn-success js-sweetalert view"  :to="{ name: 'viewPlaceCategories', params: { placeTypeId: placeType.id }}" title="Place Categories"><i class="fa fa-eye"></i></router-link>
      <button type="button" class="btn btn-danger js-sweetalert view" title="Delete"><i class="fa fa-trash-o"></i></button>
    </td>
  </tr>
</template>

<script>
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
