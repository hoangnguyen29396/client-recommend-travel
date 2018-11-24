<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>{{ placeType.name }}</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input v-model="placeCategory.name" type="text" class="form-control" placeholder="Enter place category">
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button class="btn btn-primary" @click="createPlaceCategory(placeCategory, placeTypeId)" type="submit">Add</button>
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
                <place-category-element v-for="placeCategory in placeCategories" :key="placeCategory.id" :placeCategory="placeCategory"
                @update-place-category="updatePlaceCategory"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceCategoryElement from './PlaceCategoryElement'
import PlaceCategoryService from '@/services/place-category'
import PlaceTypeService from '@/services/place-type'

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
    return {
      placeCategories: [],
      placeCategory: {
        name: '',
        idPlaceType: 0
      },
      placeType: {}
    }
  },
  computed: {

  },
  mounted () {
    this.fetchPlaceType(this.placeTypeId)
    this.fetchPlaceCategories(this.placeTypeId)
  },
  methods: {
    fetchPlaceCategories (placeTypeId) {
      const service = new PlaceCategoryService()
      service.fetchPlaceCategories(placeTypeId)
        .then(response => {
          this.placeCategories = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    fetchPlaceType (placeTypeId) {
      const service = new PlaceTypeService()
      service.fetchPlaceType(placeTypeId)
        .then(response => {
          this.placeType = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    createPlaceCategory (placeCategory, placeTypeId) {
      const service = new PlaceCategoryService()
      placeCategory.idPlaceType = placeTypeId
      service.createPlaceCategory(placeCategory)
        .then(response => {
          this.placeCategories.unshift(response.data.data)
          this.placeCategory.name = ''
          this.placeCategory.idPlaceType = 0
        })
        .catch(() => {
          alert('error')
        })
    },
    updatePlaceCategory (placeCategory) {
      const service = new PlaceCategoryService()
      service.updatePlaceCategory(placeCategory)
        .then(response => {
          placeCategory = response.data.data
          let placeCategoryIndex = this.placeCategories.findIndex(_placeCategory => _placeCategory.id === placeCategory.id)
          this.placeCategories.splice(placeCategoryIndex, 1)
          this.placeCategories.unshift(placeCategory)
        })
        .catch(() => {
          alert('error')
        })
    }
  }
}
</script>
