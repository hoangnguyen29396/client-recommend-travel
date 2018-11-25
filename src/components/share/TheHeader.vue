<template>
  <nav class="navbar navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-brand">
        <a href="index.html">
        <img src="/static/assets/images/logo-icon.svg" alt="Mplify Logo" class="img-responsive logo">
        <span class="name">Manage</span>
        </a>
      </div>
      <div class="navbar-right">
        <ul class="list-unstyled clearfix mb-0">
          <li>
            <div class="navbar-btn btn-toggle-show">
              <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
            </div>
            <a href="javascript:void(0);" class="btn-toggle-fullwidth btn-toggle-hide"><i class="fa fa-bars"></i></a>
          </li>
          <li>
            <div id="navbar-menu">
              <ul class="nav navbar-nav">
                <li class="dropdown">
                  <a href="javascript:void(0);" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                  <img class="rounded-circle" src="/static/assets/images/user-small.png" width="30" alt="">
                  </a>
                  <div class="dropdown-menu animated flipInY user-profile">
                    <div class="m-t-10 p-3 drop-list">
                      <ul class="list-unstyled">
                        <li><a href="#" @click.prevent="logout"><i class="icon-power"></i>Logout</a></li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {removeAuthToken} from '@/services/auth'

export default {
  methods: {
    logout () {
      removeAuthToken()
      this.$router.push({name: 'login'})
    }
  }
}
</script>
