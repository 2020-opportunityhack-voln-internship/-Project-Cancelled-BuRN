<template>
  <div>
    <ul class="m1 h5 list-reset" v-if="breadcrumb">
      <li :class="{'breadcrumb-active':stage1}"><span class="number">1</span> import users</li>
      <span class="flex-auto line"></span>
      <li :class="{'breadcrumb-active':stage2}"><span class="number">2</span> create messages</li>
      <span class="flex-auto line"></span>
      <li :class="{'breadcrumb-active':stage3}"><span class="number">3</span> press the button</li>
    </ul>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumb() {
      return !(this.$route.name === 'CampaignList');
    },
    stage1() {
      return this.$route.name === 'NewCampaign'
    },
    stage2() {
      return this.$route.name === 'EditCampaign'
    },
    stage3() {
      return this.$route.name === 'SendCampaign'
    },
  },
};
</script>

<style>
ul {
  display: flex;
  justify-content: space-between;
}
li {
  transition: all .3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
}
.line {
  border-bottom: 2px solid black;
  margin: 10px;
  position: relative;
  top: -45px;
}
.number {
  border-radius: 50%;
  background: #555;
  color: #eee;
  /* padding: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
}
h1 {
  margin: 0;
}
.breadcrumb-active{
  /* font-weight: bold; */
  background: #555;
  color: #eee;
}
.breadcrumb-active .number {
  background: #0a0;
}
.slide-enter-active, .slide-leave-active {
  transition: all .25s;
}
.slide-enter{
  opacity: 0;
  transform: translateX(300px)
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-300px)
}
</style>
