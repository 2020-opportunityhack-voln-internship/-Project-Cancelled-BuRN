<template>
  <div class="flex flex-column">
    <div v-if="!parsing && !file">
      <input class="p2 m1 h3 flex-auto" type="text" :value="campaignName" placeholder="Campaign Name" autofocus/>
      <input class="m1 h4" type="file" ref="file" accept="text/csv">
      <div>
        <div @click="processFile" class="button py1 px2 m1">
          next
        </div>
      </div>
    </div>
    <div v-if="parsing">pretend this is a loading spinner</div>
    <div v-if="!parsing && file">{{file}}</div>
  </div>
</template>

<script>
import papa from 'papaparse';
export default {
  data() {
    return {
      campaignName: "",
      file: null,
      parsing: false,
      stage: 0
    };
  },
  methods: {
    processFile() {
      // this.file = event.target.value
      const file = this.$refs.file.files[0];
      console.log(file);
      this.file = this.$store.dispatch('parse', file)
      .then((data) => {
        this.parsing = false;
        this.file = data;
      });
      this.parsing = true;
    }
  },
  computed: {
    dataReady() {
      return 
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
}
</style>
