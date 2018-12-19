<template>
  <div>
    <div id="wrapper">
      <TheHeader />
      <SideBar />
      <div id="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/share/TheHeader.vue'
import SideBar from '../../components/share/SideBar.vue'

export default {
  components: {
    TheHeader,
    SideBar
  }
}
</script>
