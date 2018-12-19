<template>
  <tr>
    <td>{{ action.nameTable }}</td>
    <td>
      <ul>
        <li v-for="objectAction in action.listAction" :key="objectAction.id" class="action-list">
          <span>{{ objectAction.name }}</span>
          <button class="btn btn-danger js-sweetalert delete-button" title="Delete"><i class="fa fa-trash-o" @click="deleteAction(objectAction.idPermiss)"></i></button>
        </li>
      </ul>
    </td>
  </tr>
</template>
<script>
import ActionService from '@/services/action'

export default {
  props: {
    userId: [String, Number],
    action: Object
  },
  methods: {
    deleteAction (permissionId) {
      const service = new ActionService('delete-action-table-by-idPermiss')
      service.delete(permissionId)
        .then(() => {
          let permissionIndex = this.action.listAction.findIndex(_action => _action.idPermiss === permissionId)
          this.action.listAction.splice(permissionIndex, 1)
        })
        .catch(() => {
          alert('error')
        })
    }
  }
}
</script>
