<template>
  <div class="row clearfix">
    <div class="col-lg-12">
      <div class="card">
        <div class="header">
          <h2>Evaluation</h2>
        </div>
        <div class="body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Score</th>
                  <th>Content</th>
                  <th>Evaluation date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <evaluation-element v-for="evaluation in evaluations"
                  :key="evaluation.id" :evaluation="evaluation"
                  @delete-evaluation="deleteEvaluation" />
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
import { mapState, mapActions } from 'vuex'
import Pagination from '../../share/Pagination.vue'
import EvaluationElement from './EvaluationElement'

export default {
  props: {
    locationId: {
      required: true
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  components: {
    Pagination,
    EvaluationElement
  },
  computed: {
    ...mapState('evaluation', [
      'evaluations',
      'sumPage'
    ])
  },
  mounted () {
    let payLoad = {'locationId': this.locationId, 'currentPage': this.currentPage}
    this.fetchEvaluations(payLoad)
  },
  methods: {
    ...mapActions('evaluation', [
      'fetchEvaluations',
      'deleteEvaluation'
    ]),
    onPageChange (page) {
      this.currentPage = page
      let payLoad = {'locationId': this.locationId, 'currentPage': this.currentPage}
      this.fetchEvaluations(payLoad)
    }
  }
}
</script>
