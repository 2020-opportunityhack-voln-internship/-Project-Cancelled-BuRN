<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/campaign">Campaigns</router-link>
      <!-- <router-link to="/campaign/new">new campaign</router-link> -->
      <router-link to="/report">Reports</router-link>
    </nav>
    <router-view id="rootcontainer"/>
  </div>
</template>

<style lang="scss">
body {
  background: #eee;
  line-height: 1.8;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
nav {
  color: white;
  // width: 200px;
  // padding: 30px;
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
#rootcontainer {
  padding: 10px;
  margin-left: 260px;
}
.router-link-exact-active {
  text-decoration: underline;
  // font-weight: bold;
  background: rgba(73, 73, 73, 0.6);
}
.router-link-exact-active::before {
  // content: '> '
}
</style>
