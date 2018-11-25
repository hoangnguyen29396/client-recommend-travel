<template>
  <layout>
    <div class="container-fluid">
      <div class="block-header">
        <div class="row">
          <div class="col-lg-5 col-md-8 col-sm-12">
            <h2>Location management</h2>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </layout>
</template>

<script>
import Layout from '../layouts/Main'

export default {
  components: {
    Layout
  }
}
</script>
