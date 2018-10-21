import Vue from 'vue';
import Vuex from 'vuex';
import urljoin from 'url-join';
import axios from 'axios';
import papa from 'papaparse';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    campaignMap: {},
    inputcsv: {},
  },
  mutations: {
    newCampaign(state, campaign) {
      Vue.set(state.campaignMap, campaign.id, campaign);
    },
  },
  getters: {
    campaignById(id) {
      return this.$store.state.campaignMap[id];
    },
  },
  actions: {
    async parse(context, { file, name }) {
      const userList = await new Promise((resolve, reject) => {
        papa.parse(file, {
          complete: (data) => {
            const objlist = data.data.map(row => ({
              name: row[0],
              phone: row[1],
              email: row[2],
            }));
            resolve(objlist);
          },
          error: (e) => {
            reject(e);
          },
        });
      });
      axios.post('/')
      return userList;
      // make API call
      // commit new campaign
    },
  },
});
