import BaseSerive from './base'

export default class EvaluationService extends BaseSerive {
  fetchEvaluations (locationId, currentPage) {
    return new Promise((resolve, reject) => {
      this.request().get(`/api/web/review/${locationId}/${currentPage}`)
        .then(resolve)
        .catch(reject)
    })
  }
  deleteEvaluation (evaluation) {
    return new Promise((resolve, reject) => {
      this.request().delete(`/delete/review/${evaluation.id}`)
        .then(resolve)
        .catch(reject)
    })
  }
}
