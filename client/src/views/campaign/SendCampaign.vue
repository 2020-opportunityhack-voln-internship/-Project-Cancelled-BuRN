<template>
  <div id="buttonContainer" class="flex flex-auto flex-column justify-center items-center">
    <h1>{{campaign.name}}</h1>
    <div><div class="button" @click="sendCampaign">Send</div></div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    async sendCampaign() {
      console.log('send!')
      await this.$store.dispatch('sendCampaign', { campaign: this.id });
      this.$router.push('/campaign');
    }
  },
  computed: {
    campaign() {
      return this.$store.getters.campaignById(this.id);
    }
  },
};
</script>

<style lang="scss" scoped>
$color: #0a0;

@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
}
.button {
  background: none;
  padding: 0.75em 2em;
  text-align: center;
  text-decoration: none;
  color: $color;
  border: 2px solid $color;
  font-size: 24px;
  // display: block;
  border-radius: 0.3em;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    background-color: rgba(255,255,255,0.5);
    height: 100%;
    width: 3em;
    display: block;
    position: absolute;
    top: 0;
    left: -4.5em;
    transform: skewX(-45deg) translateX(0);
    transition: none;
  }
  &:hover {
    background-color: $color;
    color: #fff;
    border-bottom: 4px solid darken($color, 10%);
    &:before {
      transform: skewX(-45deg) translateX(13.5em);
     transition: all 0.5s ease-in-out;
    }
  }
}

</style>
