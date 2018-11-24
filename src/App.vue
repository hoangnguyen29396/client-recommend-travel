<template>
  <div>
    <!-- Page Loader -->
    <Loader />
    <!-- Overlay For Sidebars -->
    <div class="overlay" style="display: none;"></div>
    <div id="wrapper">
      <TheHeader />
      <SideBar />
      <div id="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>
