<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Users</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-m-6 col-sm-12 mb-4">
              <router-link class="btn btn-primary js-sweetalert" :to="{name: 'addUser'}" title="Add user">Add</router-link>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table m-b-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Fullname</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <user-element v-for="user in users"
                  :key="user.id" :user="user" />
              </tbody>
            </table>
          </div>
        </div>
        <pagination :total-pages="sumPage" :current-page="currentPage"
          :maxVisibleButtons="4" @pagechanged="onPageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../share/Pagination.vue'
import UserElement from './UserElement'
import UserService from '@/services/user'

export default {
  components: {
    Pagination,
    UserElement
  },
  data () {
    return {
      currentPage: 1,
      sumPage: 0,
      users: []
    }
  },
  computed: {
  },
  mounted () {
    this.fetchUsers(this.currentPage)
  },
  methods: {
    fetchUsers (currentPage) {
      const service = new UserService()
      service.fetchUsers(currentPage)
        .then(response => {
          this.users = response.data.data.usersProfileDTOList
          this.sumPage = response.data.data.sumPage
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    },
    onPageChange (page) {
      this.currentPage = page
      this.fetchUsers(this.currentPage)
    }
  }
}
</script>
