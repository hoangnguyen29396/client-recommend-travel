<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>User's action</h2>
        </div>
        <div class="body">
          <div class="row clearfix">
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <select class="form-control"
                  v-model="permission.idResource">
                  <option value="">Please choose table</option>
                  <option v-for="table in tables"
                    :key="table.id"
                    :value="table.id">
                    {{ table.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <select class="form-control"
                  v-model="permission.idAction">
                  <option value="">Please choose action</option>
                  <option v-for="tableAction in tableActions"
                    :key="tableAction.id"
                    :value="tableAction.id">
                    {{ tableAction.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12">
              <button @click="createPermission" class="btn btn-primary" type="submit">Add</button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Table</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <action-element v-for="action in actions"
                  :key="action.id"
                  :action="action"
                  v-bind="{userId}">
                </action-element>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionElement from './ActionElement.vue'
import ActionService from '@/services/action'

export default {
  props: ['userId'],
  data () {
    return {
      actions: [],
      tables: [],
      tableActions: [],
      permission: {
        idUser: this.userId,
        idResource: '',
        idAction: ''
      }
    }
  },
  components: {
    ActionElement
  },
  created () {
    this.fetchActions()
    this.fetchTables()
    this.fetchTableActions()
  },
  methods: {
    fetchActions () {
      const service = new ActionService(`api/permissions/${this.userId}`)
      service.index()
        .then(response => {
          this.actions = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    fetchTables () {
      const service = new ActionService('api/tables')
      service.index()
        .then(response => {
          this.tables = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    fetchTableActions () {
      const service = new ActionService('api/actions')
      service.index()
        .then(response => {
          this.tableActions = response.data.data
        })
        .catch(() => {
          alert('error')
        })
    },
    createPermission () {
      const service = new ActionService('add-action-table')
      service.create(this.permission)
        .then(() => {
          this.fetchActions()
        })
        .catch(() => {
          alert('alert')
        })
    }
  }
}
</script>
