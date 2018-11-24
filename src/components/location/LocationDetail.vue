<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Basic Example 1</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-m-6 col-sm-12 mb-4">
              <router-link class="btn btn-primary js-sweetalert" :to="{name: 'addLocation'}" title="Add location">Add</router-link>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Introduction</th>
                  <th>Place Category</th>
                  <th>Created Date</th>
                  <th>Status</th>
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
import { mapState, mapActions } from 'vuex'
import Pagination from '../share/Pagination.vue'
import LocationElement from './LocationElement.vue'

export default {
  components: {
    Pagination,
    LocationElement
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState('location', [
      'sumPage',
      'locations'
    ])
  },
  mounted () {
    this.fetchLocations(this.currentPage)
  },
  methods: {
    ...mapActions('location', [
      'fetchLocations'
    ]),
    onPageChange (page) {
      this.currentPage = page
      this.fetchLocations(this.currentPage)
    }
  }
}
</script>
