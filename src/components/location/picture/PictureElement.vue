<template>
  <tr>
    <td>
      <span><img :src="'https://travellingrecommend.herokuapp.com/downloadFile/' + picture.image" height="150" width="150" /></span>
    </td>
    <td>
      <button type="button" class="btn btn-danger js-sweetalert" title="Delete"><i class="fa fa-trash-o" @click="fireDeletePicture(picture)"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['picture'],
  data () {
    return {}
  },
  methods: {
    fireDeletePicture: function (picture) {
      this.$emit('delete-picture', picture)
    }
  }
}
</script>
