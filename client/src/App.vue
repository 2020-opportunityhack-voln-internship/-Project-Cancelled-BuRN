<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/campaign">Campaigns</router-link>
      <router-link to="/campaign/new">new campaign</router-link>
      <router-link to="/report">Reports</router-link>
    </nav>
    <router-view id="rootcontainer"/>
  </div>
</template>

<script>
import axios from 'axios';
import urljoin from 'url-join';
import { API_URL } from '@/config';
import { authOptions } from '@/store';

export default {
  mounted() {
    axios.post(urljoin(API_URL, 'login'), { password: 'rawr' });
  },
};
</script>

<style lang="scss">
@import url(./animation.css);
body {
  background: #eee;
  line-height: 1.8;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: 'Trebuchet MS', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  color: white;
  // width: 200px;
  padding-top: 30px;
  position: fixed;
  float: left;
  height: 100vh;
  overflow: auto;
  background: #333;
  background-image: url('./assets/mountains.jpg');
  background-size: cover;
  background-position: center center;
}
nav a {
  text-decoration: none;
  width: 200px;
  padding: 10px 30px;
  color: white;
  display: block;
}
nav a:hover {
  background: rgba(75, 75, 75, 0.6);
  text-decoration: underline;
}
#rootcontainer {
  padding: 10px;
  box-sizing: border-box;
  margin-left: 260px;
  overflow-x: hidden;
  overflow-y: visible;
height: 100vh;
}
.router-link-active {
  text-decoration: underline;
  background: rgba(50, 50, 50, 0.6);
}
.button {
  cursor: pointer;
  background: #333;
  color: #eee;
  border-radius: 3px;
  -webkit-appearance: none;
  flex: 1 0 auto;
}
.button:hover {
  background: #555;
}
.btn-success {
  background: #0a0;
}
.btn-success:hover {
  background: rgb(0, 204, 0);
}
.google-signin-button {
  background-image: url('./assets/google_button.png');
  width: 197px;
  height: 50px;
  background-color: white;
}
.google-signin-button:hover {
    cursor: pointer;
}
</style>
