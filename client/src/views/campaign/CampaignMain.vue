<template>
  <div class="flex flex-column">
    <router-link v-for="campaign in Object.values(campaigns)" :key="campaign.id" :to="`/campaign/${campaign.id}/edit`">{{campaign.name}}</router-link>
    <router-link to="/campaign/new">+ new</router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchCampaigns');
  },
  computed: {
    campaigns() {
      return this.$store.state.campaignMap;
    },
  },
};
</script>

<style scoped>
a {
  display: block;
}
</style>
