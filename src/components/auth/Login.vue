<template>
  <div class="body">
    <div class="form-group">
      <label class="control-label sr-only">User</label>
      <input v-model="username" type="username" class="form-control" value="" placeholder="Username"
      name="username"
      v-validate="'required'">
      <span class="error-message"
        v-show="errors.has('username')">
        {{ errors.first('username') }}
      </span>
    </div>
    <div class="form-group">
      <label class="control-label sr-only">Password</label>
      <input v-model="password" type="password" class="form-control" value="" placeholder="Password"
      name="password"
      v-validate="'required'">
      <span class="error-message"
        v-show="errors.has('password')">
        {{ errors.first('password') }}
      </span>
    </div>
    <div class="error-message">
      <p>
        {{ errorMessage }}
      </p>
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
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    nextSteps () {
      this.$router.push({name: 'viewLocations'})
    },
    login (username, password) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let formData = new FormData()
          formData.append('username', username)
          formData.append('password', password)
          login(formData)
            .then(response => {
              setAuthToken(response.data.data)
              setActions(response.data.listAction)
              console.log(response.data.listAction)
              this.nextSteps()
            })
            .catch(errors => {
              this.errorMessage = errors.response.data.result_message
            })
        }
      })
    }
  }
}
</script>
