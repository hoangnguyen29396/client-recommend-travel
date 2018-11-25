<template>
  <div class="body">
    <div class="form-group">
      <label class="control-label sr-only">User</label>
      <input v-model="username" type="username" class="form-control" value="" placeholder="Username">
    </div>
    <div class="form-group">
      <label class="control-label sr-only">Password</label>
      <input v-model="password" type="password" class="form-control" value="" placeholder="Password">
    </div>
    <button @click="login(username, password)" type="submit" class="btn btn-primary btn-lg btn-block">LOGIN</button>
  </div>
</template>

<script>
import {login, setAuthToken, setActions} from '@/services/auth'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    nextSteps () {
      this.$router.push({name: 'viewLocations'})
    },
    login (username, password) {
      let formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      login(formData)
        .then(response => {
          setAuthToken(response.data.data)
          setActions(response.data.listAction)
          this.nextSteps()
        })
        .catch(() => {
          alert('error')
        })
    }
  }
}
</script>
