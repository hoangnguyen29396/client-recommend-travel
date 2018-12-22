<template>
  <tr :class="{editing: placeCategory == editedPlaceCategory}" v-cloak>
    <td>
      <span class="view" @dblclick="editPlaceCategory(placeCategory)">{{ placeCategory.name }}</span>
      <input v-model="placeCategory.name" v-place-category-focus="placeCategory == editedPlaceCategory" type="text" class="edit col-lg-4 form-control">
    </td>
    <td>
      <button type="button" @click="updatePlaceCategory(placeCategory)" class="btn btn-success edit" title="Save"
        v-show="isAction('UPDATE_PLACECATEGORY')"><i class="fa fa-save"></i></button>
      <button type="button" @click="cancelEditPlaceCategory(placeCategory)" class="btn btn-warning edit" title="Cancel"><i class="fa fa-backward"></i></button>
      <button type="button" class="btn btn-danger js-sweetalert view"
        title="Delete"
        @click="deletePlaceCategory"
        v-show="isAction('DEL_PLACECATEGORY')"><i class="fa fa-trash-o"></i>
      </button>
    </td>
  </tr>
</template>
<script>
import PlaceCategoryService from '@/services/place-category'
import { isAction } from '@/services/auth'

export default {
  props: ['placeCategory'],
  data: function () {
    return {
      editedPlaceCategory: null
    }
  },
  methods: {
    editPlaceCategory: function (placeCategory) {
      this.beforeEditCache = placeCategory.name
      this.editedPlaceCategory = placeCategory
    },
    updatePlaceCategory: function (placeCategory) {
      this.$emit('update-place-category', placeCategory)
    },
    cancelEditPlaceCategory: function (placeCategory) {
      this.editedPlaceCategory = null
      placeCategory.name = this.beforeEditCache
    },
    deletePlaceCategory () {
      const placeCategoryService = new PlaceCategoryService('place-category')
      placeCategoryService.delete(this.placeCategory.id)
        .then(response => {
          if (response.data.result_code === 500) {
            alert('This place category can not delete')
          } else {
            this.$emit('delete-place-category', this.placeCategory)
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
    'place-category-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
