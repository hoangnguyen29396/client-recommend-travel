<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Add</h2>
        </div>
        <div class="body">
          <div class="form-group">
            <label>Name</label>
            <input v-model="location.name" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>Introduction</label>
            <input v-model="location.introduction" type="email" class="form-control">
          </div>
          <div class="form-group">
            <label>Content</label>
            <textarea v-model="location.content" class="form-control" rows="5" cols="30"></textarea>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label for="food">Place Type</label>
                <br>
                <select class="form-control" v-model="location.idPlaceType" @change="handlePlaceTypeChange">
                  <option disabled value="0">Choose place type</option>
                  <option v-for="placeType in placeTypes"
                    :key="placeType.id"
                    :value="placeType.id">{{ placeType.name }}</option>
                </select>
              </div>
              <div class="col-lg-6">
                <label for="food">Category</label>
                <br>
                <select class="form-control" v-model="location.idPlaceCategory">
                  <option disabled value="0">Choose place category</option>
                  <option v-for="placeCategory in placeCategories"
                    :key="placeCategory.id"
                    :value="placeCategory.id"
                    >{{ placeCategory.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input v-model="location.phone" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="location.email" type="email" class="form-control">
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
          <button @click="updateLocation({location, locationId})" type="submit" class="btn btn-primary">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    locationId: {
      required: true
    }
  },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },
  computed: {
    ...mapState('placeCategory', [
      'placeCategories'
    ]),
    ...mapState('placeType', [
      'placeTypes'
    ]),
    ...mapState('location', [
      'location'
    ])
  },
  mounted () {
    this.fetchPlaceTypes()
    this.fetchLocation(this.locationId)
    this.geolocate()
  },
  methods: {
    ...mapActions('placeCategory', [
      'fetchPlaceCategories'
    ]),
    ...mapActions('placeType', [
      'fetchPlaceTypes'
    ]),
    ...mapActions('location', [
      'fetchLocation',
      'updateLocation'
    ]),
    setPlace (place) {
      this.currentPlace = place
    },
    handlePlaceTypeChange (event) {
      if (event.target.value === 0) {
        this.$store.state.placeCategory.placeCategories = []
      } else {
        this.fetchPlaceCategories(event.target.value)
      }
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
