<template>
  <div class="flex flex-column">
    <h1>{{campaign.name}}</h1>
    Messages
    <div class="">
      <message v-for="message in campaign.messages" :key="message.id" :message="message" :editable="campaign.status === 'created'" :campaignid="campaign.id" />
      <message v-if="campaign.status === 'created'" key="0" :message="null" :campaignid="campaign.id" />
    </div>
    <div>
      <div @click="next" class="button btn-success py1 px2 my1">
        Next
      </div>
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
      return this.$store.getters.campaignById(this.id);
    },
  },
  methods: {
    next() {
      this.$router.push(`/campaign/${this.id}/send`);
    },
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
