<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>{{ isCreating ? 'Add location' : 'Edit location' }}</h2>
        </div>
        <div class="body">
          <div class="error-message">
            <p v-for="error in listError" :key="error.message">
              {{ error.message }}
            </p>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input v-model="location.name" type="text" class="form-control"
              name="name"
              v-validate="'required|min:2'">
            <span class="error-message"
              v-show="errors.has('name')">
              {{ errors.first('name') }}
            </span>
          </div>
          <div class="form-group">
            <label>Introduction</label>
            <input v-model="location.introduction" type="email" class="form-control"
              name="introduction"
              v-validate="'required|min:2'">
            <span class="error-message"
              v-show="errors.has('introduction')">
              {{ errors.first('introduction') }}
            </span>
          </div>
          <div class="form-group">
            <label>Content</label>
            <textarea v-model="location.content" class="form-control"
              rows="5" cols="30"
              name="content"
              v-validate="'required'">
            </textarea>
            <span class="error-message"
              v-show="errors.has('content')">
              {{ errors.first('content') }}
            </span>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label for="food">Place Type</label>
                <br>
                <select class="form-control"
                  v-model="location.idPlaceType"
                  @change="changePlaceType">
                  <option value="">Choose place type</option>
                  <option v-for="placeType in placeTypes"
                    :key="placeType.id"
                    :value="placeType.id">
                    {{ placeType.name }}
                  </option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="food">Category</label>
                <br>
                <select class="form-control"
                  v-model="location.idPlaceCategory"
                  name="place_category"
                  v-validate="'required'">
                  <option value="">Choose place category</option>
                  <option v-for="placeCategory in listPlaceCategory"
                    :key="placeCategory.id"
                    :value="placeCategory.id">{{ placeCategory.name }}</option>
                </select>
                <span class="error-message"
                  v-show="errors.has('place_category')">
                  {{ errors.first('place_category') }}
                </span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input v-model="location.phone" type="text" class="form-control"
              name="phone"
              v-validate="'required'">
            <span class="error-message"
              v-show="errors.has('phone')">
              {{ errors.first('phone') }}
            </span>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="location.email" type="email" class="form-control"
              name="email"
              v-validate="'required|email'">
            <span class="error-message"
              v-show="errors.has('email')">
              {{ errors.first('email') }}
            </span>
          </div>
          <div class="form-group">
            <label>Search and add a pin</label>
            <gmap-autocomplete class="form-control"
              @place_changed="setPlace">
            </gmap-autocomplete>
            <button class="btn btn-primary mt-1 mb-2" @click="addMarker">Search</button>
            <br/>
          </div>
          <gmap-map
            ref="mapRef"
            :center="center"
            :zoom="12"
            style="width:100%;  height: 400px;"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
          <br>
          <button @click="changeLocation(location)" type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlaceCategoryService from '@/services/place-category'
import PlaceTypeService from '@/services/place-type'
import LocationService from '@/services/location'

export default {
  props: ['locationId'],
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      selected: 'Choose place type',
      placeTypes: [],
      placeCategories: [],
      location: {
        name: '',
        introduction: '',
        idPlaceType: '',
        idPlaceCategory: '',
        content: '',
        idStatus: 1,
        nameAddress: '',
        latitudeAddress: 0.0,
        longitudeAddress: 0.0,
        phone: '',
        email: '',
        idDuration: 1
      },
      listError: [],
      isCreating: true
    }
  },
  created () {
    if (!isNaN(this.locationId)) {
      this.fetchLocation(this.locationId)
      this.isCreating = false
    }
    this.fetchPlaceCategories()
    this.fetchPlaceTypes()
    this.geolocate()
  },
  computed: {
    listPlaceCategory () {
      if (this.location.idPlaceType === '') {
        return this.placeCategories
      } else {
        return this.placeCategories.filter(_placeCategory =>
          _placeCategory.idPlaceType === this.location.idPlaceType
        )
      }
    }
  },
  methods: {
    changePlaceType () {
      this.location.idPlaceCategory = ''
    },
    fetchLocation (locationId) {
      const service = new LocationService(`/api/location`)
      service.show(locationId)
        .then(response => {
          this.location = response.data.data
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    fetchPlaceCategories () {
      const service = new PlaceCategoryService(`place-categories`)
      service.index()
        .then(response => {
          this.placeCategories = response.data.data
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    fetchPlaceTypes () {
      const service = new PlaceTypeService()
      service.index()
        .then(response => {
          this.placeTypes = response.data.data
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    updateLocation (location) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const service = new LocationService(`/web/update-location`)
          service.update(this.locationId, location)
            .then(response => {
              this.$router.push({name: 'viewLocations'})
            })
            .catch(errors => {
              this.listError = errors.response.data.data
            })
        }
      })
    },
    createLocation (location) {
      console.log(location)
      this.$validator.validateAll().then((result) => {
        if (result) {
          const service = new LocationService('create-location-non-picture')
          service.create(location)
            .then(response => {
              this.$router.push({name: 'viewLocations'})
            })
            .catch(errors => {
              this.listError = errors.response.data.data
            })
        }
      })
    },
    changeLocation (location) {
      if (this.isCreating) {
        this.createLocation(location)
      } else {
        this.updateLocation(location)
      }
    },
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        let latitude = this.currentPlace.geometry.location.lat()
        let longitude = this.currentPlace.geometry.location.lng()
        const marker = {
          lat: latitude,
          lng: longitude
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.location.nameAddress = this.currentPlace.adr_address.replace(/<\/?[^>]+(>|$)/g, '')
        this.location.latitudeAddress = latitude
        this.location.longitudeAddress = longitude
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
