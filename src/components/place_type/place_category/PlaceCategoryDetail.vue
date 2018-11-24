<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Basic Example 2</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input v-model="newPlaceCategory.name" type="text" class="form-control" placeholder="Enter place category">
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button class="btn btn-primary" @click="createPlaceCategory({newPlaceCategory, placeTypeId})" type="submit">Add</button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table m-b-0">
              <thead>
                <tr>
                  <th>Place categories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <place-category-element v-for="placeCategory in placeCategories" :key="placeCategory.id" :placeCategory="placeCategory" @update-place-category="updatePlaceCategory"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PlaceCategoryElement from './PlaceCategoryElement'

export default {
  props: {
    placeTypeId: {
      required: true
    }
  },
  components: {
    PlaceCategoryElement
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapState('placeType', [
      'placeType'
    ]),
    ...mapState('placeCategory', [
      'placeCategories',
      'newPlaceCategory'
    ])
  },
  mounted () {
    this.fetchPlaceType(this.placeTypeId)
    this.fetchPlaceCategories(this.placeTypeId)
  },
  methods: {
    ...mapActions('placeType', [
      'fetchPlaceType'
    ]),
    ...mapActions('placeCategory', [
      'fetchPlaceCategories',
      'createPlaceCategory',
      'updatePlaceCategory'
    ])
  }
}
</script>
