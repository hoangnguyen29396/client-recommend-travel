<template>
  <tr>
    <td>{{ evaluation.nameUser }}</td>
    <td>{{ evaluation.score }}</td>
    <td>{{ evaluation.content }}</td>
    <td>{{ evaluation.dateReview }}</td>
    <td>
      <button type="button" class="btn btn-danger js-sweetalert" title="Delete"><i class="fa fa-trash-o" @click="fireDeleteEvaluation(evaluation)"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['evaluation'],
  data () {
    return {}
  },
  methods: {
    fireDeleteEvaluation: function (evaluation) {
      this.$emit('delete-evaluation', evaluation)
    }
  }
}
</script>
