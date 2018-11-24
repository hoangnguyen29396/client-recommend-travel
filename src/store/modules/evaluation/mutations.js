import * as mutations from './mutation-types'

export default {
  [mutations.EVALUATIONS_FETCHED] (state, evaluations) {
    state.evaluations = evaluations.listEvaluationWeb
    state.sumPage = evaluations.sumPage
  },
  [mutations.EVALUATION_DELETED] (state, evaluation) {
    let evaluationIndex = state.evaluations.findIndex(_evaluation => _evaluation.id === evaluation.id)
    state.evaluations.splice(evaluationIndex, 1)
  }
}
