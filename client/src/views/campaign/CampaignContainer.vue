<template>
  <div>
    <h1 class="m1" v-if="breadcrumb">Pretend this is step-breadcrumbs</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stage: 0,
    };
  },
  computed: {
    breadcrumb() {
      return !(this.$route.name === 'CampaignList');
    },
  },
}
</script>

<style>
h1 {
  margin: 0;
}
</style>
