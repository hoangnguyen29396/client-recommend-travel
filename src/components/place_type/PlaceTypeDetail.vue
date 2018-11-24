<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Place type</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input v-model="placeType.name" type="text" class="form-control" placeholder="Enter place type">
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button class="btn btn-primary" @click="createPlaceType(placeType)" type="submit">Add</button>
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
                  <place-type-element v-for="placeType in placeTypes" :key="placeType.id" :placeType="placeType" @update-place-type="updatePlaceType"/>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlaceTypeElement from './PlaceTypeElement'
import PlaceTypeService from '@/services/place-type'

export default {
  components: {
    PlaceTypeElement
  },
  data: function () {
    return {
      placeTypes: [],
      placeType: {
        id: '',
        name: ''
      }
    }
  },
  computed: {

  },
  mounted () {
    this.fetchPlaceTypes()
  },
  methods: {
    fetchPlaceTypes () {
      const service = new PlaceTypeService()
      service.fetchPlaceTypes()
        .then(response => {
          this.placeTypes = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    createPlaceType (placeType) {
      const service = new PlaceTypeService()
      service.createPlaceType(placeType)
        .then(response => {
          this.placeTypes.unshift(response.data.data)
          this.placeType.name = ''
        })
        .catch(() => {
          alert('error')
        })
    },
    updatePlaceType (placeType) {
      const service = new PlaceTypeService()
      service.updatePlaceType(placeType)
        .then(response => {
          placeType = response.data.data
          let placeTypeIndex = this.placeTypes.findIndex(_placeType => _placeType.id === placeType.id)
          this.placeTypes.splice(placeTypeIndex, 1)
          this.placeTypes.unshift(placeType)
        })
        .catch(() => {
          alert('error')
        })
    }
  }
}
</script>
