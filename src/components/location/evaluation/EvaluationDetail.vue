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
import Pagination from '../../share/Pagination.vue'
import EvaluationElement from './EvaluationElement'
import EvaluationService from '@/services/evaluation'

export default {
  props: {
    locationId: {
      required: true
    }
  },
  data () {
    return {
      currentPage: 1,
      sumPage: 0,
      evaluations: []
    }
  },
  components: {
    Pagination,
    EvaluationElement
  },
  computed: {
  },
  created () {
    this.fetchEvaluations(this.locationId, this.currentPage)
  },
  methods: {
    fetchEvaluations (locationId, currentPage) {
      const service = new EvaluationService()
      service.fetchEvaluations(locationId, currentPage)
        .then(response => {
          this.evaluations = response.data.data.listEvaluationWeb
          this.sumPage = response.data.data.sumPage
        })
        .catch(() => {
          alert('error')
        })
    },
    deleteEvaluation (evaluation) {
      const service = new EvaluationService()
      service.deleteEvaluation(evaluation)
        .then(() => {
          let evaluationIndex = this.evaluations.findIndex(_evaluation => _evaluation.id === evaluation.id)
          this.evaluations.splice(evaluationIndex, 1)
        })
        .catch(() => {
          alert('error')
        })
    },
    onPageChange (page) {
      this.currentPage = page
      this.fetchEvaluations(this.locationId, this.currentPage)
    }
  }
}
</script>
