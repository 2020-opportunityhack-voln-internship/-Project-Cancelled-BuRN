import 'basscss/css/basscss.min.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import GoogleSignInButton from 'vue-google-signin-button-directive';

Vue.config.productionTip = false;

new Vue({
  GoogleSignInButton,
  router,
  store,
  render: h => h(App),
}).$mount('#app');

