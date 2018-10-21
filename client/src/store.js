import Vue from 'vue';
import Vuex from 'vuex';
import urljoin from 'url-join';
import axios from 'axios';
import papa from 'papaparse';
import { API_URL } from './config';

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
    campaignById: state => id => state.campaignMap[id],
  },
  actions: {
    async parse(context, { file }) {
      return new Promise((resolve, reject) => {
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
    },
    async newCampaign(context, { name, users }) {
      const newCampaign = (await axios.post(urljoin(API_URL, '/campaign'), {
        name,
        users,
      }, {
        headers: { Authorization: 'test', 'X-FOO': 'test' },
      })).data;

      context.commit('newCampaign', newCampaign);
      return newCampaign;
      // make API call
      // commit new campaign
    },
  },
});
