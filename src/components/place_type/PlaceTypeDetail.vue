<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Place type</h2>
        </div>
        <div class="body">
          <div class="error-message">
            <p v-for="error in listError" :key="error.message">
              {{ error.message }}
            </p>
          </div>
          <div v-show="isAction('ADD_PLACETYPE')" class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input type="text"
                  class="form-control"
                  name="place_type"
                  placeholder="Enter place type"
                  v-model="placeType.name"
                  v-validate="validate.placeType">
                <span class="error-message"
                  v-show="errors.has('place_type')">
                  {{ errors.first('place_type') }}
                </span>
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
                <place-type-element v-for="placeType in placeTypes" :key="placeType.id" :placeType="placeType"
                  @update-place-type="updatePlaceType"
                  @delete-place-type="deletePlaceType"/>
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
import { isAction } from '@/services/auth'

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
      },
      validate: {
        placeType: {
          required: true,
          max: 20,
          min: 5
        }
      },
      listError: []
    }
  },
  created () {
    if (isAction('VIEW_PLACETYPE')) {
      this.fetchPlaceTypes()
    }
  },
  methods: {
    fetchPlaceTypes () {
      const service = new PlaceTypeService()
      service.fetchPlaceTypes()
        .then(response => {
          this.placeTypes = response.data.data
        })
        .catch(errors => {
          alert('Something is wrong, please refresh again')
        })
    },
    createPlaceType (placeType) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const service = new PlaceTypeService()
          service.createPlaceType(placeType)
            .then(response => {
              this.placeTypes.unshift(response.data.data)
              this.placeType.name = ''
              this.$validator.reset()
            })
            .catch(errors => {
              this.listError = errors.response.data.data
            })
        }
      })
    },
    updatePlaceType (placeType) {
      if (isAction('UPDATE_PLACETYPE')) {
        const service = new PlaceTypeService()
        service.updatePlaceType(placeType)
          .then(response => {
            placeType = response.data.data
            let placeTypeIndex = this.placeTypes.findIndex(_placeType => _placeType.id === placeType.id)
            this.placeTypes.splice(placeTypeIndex, 1)
            this.placeTypes.unshift(placeType)
            this.listError = []
          })
          .catch(errors => {
            this.listError = errors.response.data.data
          })
      } else {
        alert('Something is wrong, please refresh again')
      }
    },
    isAction (actionName) {
      return isAction(actionName)
    },
    deletePlaceType (placeType) {
      let index = this.placeTypes.findIndex(_placeType =>
        _placeType.id === placeType.id
      )
      this.placeTypes.splice(index, 1)
    }
  }
}
</script>
