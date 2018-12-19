<template>
  <div id="leftsidebar" class="sidebar">
    <div>
      <nav id="leftsidebar-nav" class="sidebar-nav">
        <ul id="main-menu" class="metismenu">
          <li class="heading">Main</li>
          <li>
            <router-link :to="{ name: 'viewPlaceTypes'}"><i class="icon-puzzle"></i><span>Place types</span></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'viewLocations'}"><i class="icon-magic-wand"></i><span>Locations</span></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'viewUsers'}"><i class="icon-user"></i><span>Users</span></router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
