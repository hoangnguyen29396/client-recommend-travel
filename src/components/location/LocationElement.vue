<template>
  <tr>
    <td>{{ location.name }}</td>
    <td>{{ location.introduction }}</td>
    <td>{{ location.placeCategory }}</td>
    <td>{{ location.createdDate }}</td>
    <td>{{ location.status }}</td>
    <td>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'viewPictures', params: { locationId: location.id }}" title="Pictures"><i class="fa fa-image"></i></router-link>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'editLocation', params: { locationId: location.id }}" title="Edit"><i class="fa fa-edit"></i></router-link>
      <router-link class="btn btn-success js-sweetalert"  :to="{ name: 'viewEvaluation', params: { locationId: location.id }}" title="Evaluation"><i class="fa fa-star"></i></router-link>
    </td>
  </tr>
</template>
<script>
export default {
  props: ['location']
}
</script>
