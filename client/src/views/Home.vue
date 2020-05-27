<template>
  <div class="home">
    <h1 class="m1">Good Evening.</h1>
    <div>
      <button v-google-signin-button="clientId" class="google-signin-button">
      </button>
    </div>
	<div>
	<v-facebook-login app-id="258991725447380" class="facebook-button"></v-facebook-login>
	</div>
  </div>
</template>

<script>
import VFacebookLogin from 'vue-facebook-login-component'

export default {
  name: 'home',
  data: () => ({
    clientId: '86689010721-e2ph3oij6kas7vdvup096eecob9e61ce.apps.googleusercontent.com',
  }),
  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log(idToken);
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    },
  },
   components: {
      VFacebookLogin
    }
};
</script>

<style lang="scss" scoped>
.home {
  box-sizing: border-box;
  height: 100vh;
  text-align: center;
  // padding-left: 40px !important;
  // padding: 0 !important;
}
</style>

