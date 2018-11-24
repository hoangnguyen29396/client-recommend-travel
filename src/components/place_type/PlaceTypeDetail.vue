<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Basic Example 1</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input v-model="newPlaceType.name" type="text" class="form-control" placeholder="Enter place type">
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button class="btn btn-primary" @click="createPlaceType(newPlaceType)" type="submit">Add</button>
            </div>
          </div>
            <div class="table-responsive">
              <table class="table m-b-0">
                <thead>
                  <tr>
                    <th>Place types</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <place-type-element v-for="placeType in placeTypes" :key="placeType.id"
                    :placeType="placeType" @update-place-type="updatePlaceType"/>
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
import PlaceTypeElement from './PlaceTypeElement'

export default {
  components: {
    PlaceTypeElement
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapState('placeType', [
      'placeTypes',
      'newPlaceType'
    ])
  },
  mounted () {
    this.fetchPlaceTypes()
  },
  methods: {
    ...mapActions('placeType', [
      'fetchPlaceTypes',
      'createPlaceType',
      'updatePlaceType'
    ])
  }
}
</script>
