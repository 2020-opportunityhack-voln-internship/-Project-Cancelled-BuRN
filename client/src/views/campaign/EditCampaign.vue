<template>
  <div class="flex flex-column">
    <h1>{{campaign.name}}</h1>
    Messages
    <div class="">
      <message v-for="message in campaign.messages" :key="message.id" :message="message" :campaignid="campaign.id" />
      <message key="0" :message="null" :campaignid="campaign.id" />
    </div>
  </div>
</template>

<script>
import Message from '@/components/Message.vue';

export default {
  props: ['id'],
  components: {
    Message,
  },
  computed: {
    campaign() {
      return this.$store.getters.campaignById(this.id)
    }
  },
};
</script>

<style>
/* .message {
  background: #E0E0E0;
}
.messagep:nth-child(2n) {
  background: #000;
} */
</style>
