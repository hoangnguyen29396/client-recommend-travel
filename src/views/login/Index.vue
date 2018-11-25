<template>
  <div class="vertical-align-wrap">
    <div class="vertical-align-middle auth-main">
      <div class="auth-box" style="margin:0 auto 0 auto">
        <div class="mobile-logo"><img src="/static/assets/images/logo-icon.svg" alt="Mplify"></div>
        <div class="auth-left">
          <div class="left-slider">
            <img src="/static/assets/images/login/1.jpg" class="img-fluid" alt="">
          </div>
        </div>
        <div class="auth-right">
          <div class="card">
            <div class="header">
              <p class="lead">Log in</p>
            </div>
            <form-login />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormLogin from '../../components/auth/Login'

export default {
  components: {
    FormLogin
  }
}
</script>
