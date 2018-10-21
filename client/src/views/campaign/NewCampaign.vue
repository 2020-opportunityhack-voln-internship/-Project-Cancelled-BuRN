<template>
  <div class="flex flex-column">
    <input class="p2 m1 h3 flex-auto" type="text" :value="campaignName" placeholder="Campaign Name" autofocus/>
    <input class="m1 h4" type="file" accept="text/csv" @change="processFile($event)">
    <div>
      <div class="button py1 px2 m1">
        next
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      campaignName: '',
      stage: 0
    };
  },
  methods: {
    processFile(event) {
      // this.file = event.target.value
      console.log(event.target.value);
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
