<template>
  <tr>
    <td>{{ user.username }}</td>
    <td>{{ user.fullname }}</td>
    <td>{{ user.roleName }}</td>
    <td>
      <router-link class="btn btn-success js-sweetalert"  :to="{name: 'viewActions', params: { userId: user.idUser }}" title="Actions"
        v-show="user.roleName === 'mod'"><i class="fa fa-server"></i>
      </router-link>
      <button type="button" class="btn btn-success js-sweetalert"
        v-if="user.status === 1"
        v-show="user.roleName === 'mod'"
        title="deactivate"
        @click="changeStatus">
        <i class="fa fa-check"></i>
      </button>
      <button type="button" class="btn btn-danger js-sweetalert"
        title="activate"
        v-show="user.roleName === 'mod'"
        v-else
        @click="changeStatus">
        <i class="fa fa-close"></i>
      </button>
    </td>
  </tr>
</template>
<script>
import UserService from '@/services/user'

export default {
  props: ['user'],
  methods: {
    changeStatus () {
      const service = new UserService('api/web/status-of-user')
      service.update(this.user.idUser)
        .then(() => {
          if (this.user.status === 1) {
            this.user.status = 0
          } else {
            this.user.status = 1
          }
        })
        .catch(() => {
          alert('Something is wrong, please refresh again')
        })
    }
  }
}
</script>
