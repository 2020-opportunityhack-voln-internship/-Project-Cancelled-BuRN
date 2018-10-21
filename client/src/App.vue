<template>
  <div id="app">
    <nav>
      <!-- <router-link to="/">Home</router-link> -->
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
  margin-left: 260px;
  overflow-x: hidden;
}
.router-link-active {
  text-decoration: underline;
  // font-weight: bold;
  background: rgba(50, 50, 50, 0.6);
}
</style>
