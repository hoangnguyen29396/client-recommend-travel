<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Change user</h2>
        </div>
        <div class="body">
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label>Username</label>
                <input v-model="user.username" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label>Fullname</label>
                <input v-model="user.fullname" type="text" class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label>Password</label>
                <input v-model="user.password" type="password" class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <label>Phone</label>
                <input v-model="user.phone" type="email" class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6">
                <select v-model="user.gender" class="form-control">
                  <option value="">Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
          </div>
          <br>
          <button @click="saveChange(user)" type="button" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user'

export default {
  data () {
    return {
      user: {
        username: '',
        fullname: '',
        password: '',
        address: '',
        phone: '',
        gender: ''
      },
      isCreating: true
    }
  },
  methods: {
    saveChange (user) {
      const userService = new UserService()
      userService.createUser(user)
        .then(response => {
          this.$router.push({name: 'viewUsers'})
        })
        .catch(errors => {
          console.log(errors)
        })
    }
  }
}
</script>
