<template>
  <div class="flex flex-column">
    <div class="p3 flex report-row" v-for="campaign in Object.values(campaigns)" :key="campaign.id" :to="`/campaign/${campaign.id}/edit`">
      <span class="block flex-auto">{{campaign.name}}</span>
      <a :href="urljoin(API_URL, 'campaign', campaign.id, 'responses')" class="button px1 mr1">Response Report</a>
      <a :href="urljoin(API_URL, 'campaign', campaign.id, 'responses')" class="button px1">Delivery Report</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import urljoin from 'url-join';
import { API_URL } from '@/config';
import {authOptions} from '@/store';

export default {
  data() {
    return {API_URL}
  },
  mounted() {
    this.$store.dispatch('fetchCampaigns');
  },
  computed: {
    campaigns() {
      return this.$store.state.campaignMap;
    },
  },
  methods: {
    urljoin(...args) {
      return urljoin(args);
    }
  }
};
</script>

<style scoped>
.report-row {
  color: #333;
  border-bottom: 1px solid #999;
  background: white;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}
.status-created {
  background: orange;
  color: orange;
}
.status-in-progress {
  background: #0a0;
  color: #0a0;
}
.button {
  flex: 0 0 auto;
}
</style>
