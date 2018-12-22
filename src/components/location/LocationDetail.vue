<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Location</h2>
        </div>
        <div class="body">
          <div v-show="isAction('ADD_LOCATION')" class="row clearfix">
            <div class="col-lg-4 col-m-6 col-sm-12 mb-4">
              <router-link class="btn btn-primary js-sweetalert" :to="{name: 'changeLocation'}" title="Add location">Add</router-link>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Introduction</th>
                  <th>Place Category</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <location-element v-for="location in locations" :key="location.id"
                  :location="location"/>
              </tbody>
            </table>
          </div>
        </div>
        <pagination :total-pages="sumPage" :current-page="currentPage"
          :maxVisibleButtons="4" @pagechanged="onPageChange" />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '../share/Pagination.vue'
import LocationElement from './LocationElement.vue'
import LocationService from '@/services/location'
import { isAction } from '@/services/auth'

export default {
  components: {
    Pagination,
    LocationElement
  },
  data () {
    return {
      currentPage: 1,
      locations: [],
      sumPage: 0
    }
  },
  created () {
    if (isAction('VIEW_LOCATION')) {
      this.fetchLocations(this.currentPage)
    }
  },
  methods: {
    fetchLocations (currentPage) {
      const service = new LocationService()
      service.fetchLocations(currentPage)
        .then(response => {
          this.sumPage = response.data.data.sumPage
          this.locations = response.data.data.listLocationProfieDTO
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    onPageChange (page) {
      this.currentPage = page
      this.fetchLocations(this.currentPage)
    },
    isAction (actionName) {
      return isAction(actionName)
    }
  }
}
</script>
