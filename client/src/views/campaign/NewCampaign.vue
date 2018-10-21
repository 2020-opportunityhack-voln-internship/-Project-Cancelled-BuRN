<template>
  <div class="flex flex-column">
    <div class="flex flex-column" v-if="!parsing && !users">
      <input class="p2 m1 h3 flex-auto" type="text" :value="campaignName" placeholder="Campaign Name" autofocus/>
      <input class="m1 h4" type="file" ref="file" accept="text/csv">
      <div>
        <div @click="processFile" class="button py1 px2 m1">
          next
        </div>
      </div>
    </div>
    <div v-if="parsing">pretend this is a loading spinner</div>
    <div v-if="!parsing && users" class="m1">
      Preview of user data:
      <pre>{{users}}</pre>

      <div>
        <div @click="commitNewCampaign" class="button btn-success py1 px2 m1">
          My data looks good
        </div>
        <div class="button py1 px2 m1">
          I need to change something
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import papa from 'papaparse';
export default {
  data() {
    return {
      campaignName: "",
      users: null,
      parsing: false,
      pushing: false,
      stage: 0
    };
  },
  methods: {
    processFile() {
      // this.file = event.target.value
      const file = this.$refs.file.files[0];
      console.log(file);
      this.users = this.$store.dispatch('parse', {
        file,
      })
      .then((users) => {
        this.parsing = false;
        this.users = users;
      });
      this.parsing = true;
    },
    async commitNewCampaign() {
      this.pushing = true;
      console.log(this);
      const id = await this.$store.dispatch('newCampaign', {
        users: this.users,
        name: this.campaignName,
      })
      this.$router.push(`/campaigns/${id}/edit`);
      // send after user verification of data
    }
  },
};
</script>

<style>
input[type="text"] {
  border-width: 0 0 1px 0;
}
.button {
  cursor: pointer;
  background: #333;
  color: #eee;
  flex: 1 0 auto;
  float: left;
  /* border: 1px solid #888; */
  border-radius: 3px;
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
pre {
  max-height: 400px;
  overflow: auto;
  padding: 1em;
  background: rgb(250, 250, 250);
  border: 1px solid #aaa;
  border-radius: 3px;
}
</style>
