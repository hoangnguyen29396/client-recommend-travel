import api from '../../../utils/api'
import * as mutations from './mutation-types'

export const fetchEvaluations = (context, payLoad) => {
  api.get(`/api/web/review/${payLoad.locationId}/${payLoad.currentPage}`)
    .then(
      response => context.commit(mutations.EVALUATIONS_FETCHED, response.data.data),
      error => console.log(error)
    )
}

export const deleteEvaluation = (context, evaluation) => {
  api.delete(`/delete/review/${evaluation.id}`)
    .then(
      response => context.commit(mutations.EVALUATION_DELETED, evaluation),
      error => console.log(error)
    )
}

export default {
  fetchEvaluations,
  deleteEvaluation
}
