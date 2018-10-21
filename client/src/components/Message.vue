<template>
  <div class="flex-auto message p2">
    <div class="flex flex-auto items-center" v-if="!editing && message!==null">
      <p class="mr1">{{prettyDate}}</p>
      <p class="my0 flex-auto">{{message.text}}</p>
      <a @click="edit">edit</a>
    </div>
    <a @click="edit" v-if="!editing && message===null">+ new</a>
    <form @submit="save" class="flex flex-auto" v-if="editing">
      <datepicker v-model="temp.date" input-class="p1 mr1" placeholder="date to send"></datepicker>
      <input class="flex-auto mr1 p1" type="text" v-model="temp.text" placeholder="message text" />
      <input type="submit" class="p1 button" />
    </form>
  </div>
</template>

<script>
import datepicker from 'vuejs-datepicker';

export default {
  props: ['message', 'campaignid'],
  data() {
    return {
      editing: false,
      temp: {
        text: '',
        date: null,
      }
    };
  },
  computed: {
    prettyDate() {
      return new Date(this.message.date).toDateString();
    },
  },
  mounted() {
    if(this.message) {
      this.temp.name = this.message.name;
      this.temp.text = this.message.text;
      this.temp.date = new Date(this.message.date);
    }
  },
  methods: {
    edit() {
      this.editing = true;
    },
    save(e) {
      e.preventDefault();
      this.editing = false;
      if(!this.message){
        this.$store.dispatch('newMessage', {
          message: this.temp,
          campaign: this.campaignid
        })
      }
    },
  },
  components: {
    datepicker,
  }
};
</script>

<style>
  input {
    /* padding: 15px; */
  }
  .message {
    background: #fff;
    border-bottom: 1px solid #999;
  }
  .message a {
    text-decoration: underline;
    cursor: pointer;
  }
  .message a:hover {
    color: #666;
  }
  .button {
    /* flex-basis: 100px; */
    flex: 0 0 auto !important;
    width: 100px;
  }
</style>
