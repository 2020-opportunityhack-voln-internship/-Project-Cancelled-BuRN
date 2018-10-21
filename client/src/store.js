import Vue from 'vue';
import Vuex from 'vuex';
import urljoin from 'url-join';
import axios from 'axios';
import papa from 'papaparse';
import { API_URL } from './config';

Vue.use(Vuex);

export const authOptions = {
  headers: {
    Authorization: 'test',
  },
};

export default new Vuex.Store({
  state: {
    campaignMap: {},
    messageMap: {},
    inputcsv: {},
  },
  mutations: {
    newCampaign(state, campaign) {
      Vue.set(state.campaignMap, campaign.id, campaign);
    },
    RECEIVE_CAMPAIGNS(state, campaigns) {
      campaigns.forEach((campaign) => {
        Vue.set(state.campaignMap, campaign.id, campaign);
      });
    },
    RECEIVE_NEW_MESSAGE(state, { campaign, message }) {
      state.campaignMap[campaign].messages.push(message);
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
            const objlist = data.data.map(row => (row[0].length > 0 ? {
              name: row[0],
              phone: row[1],
              email: row[2],
            } : null)).filter(item => item);
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
      }, authOptions)).data;

      context.commit('newCampaign', newCampaign);
      return newCampaign.id;
      // make API call
      // commit new campaign
    },
    async fetchCampaigns(context) {
      const campaigns = (await axios.get(urljoin(API_URL, '/campaigns'), authOptions)).data;
      context.commit('RECEIVE_CAMPAIGNS', campaigns);
    },
    async sendCampaign(context, { campaign }) {
      return axios.post(urljoin(API_URL, 'campaign', campaign, 'start'), {}, authOptions);
    },
    async newMessage(context, { message, campaign }) {
      const payload = {
        text: message.text,
        date: message.date.getTime(),
        campaignId: campaign,
      };
      const newMessage = (await axios.post(urljoin(API_URL, '/message'), payload, authOptions)).data;
      context.commit('RECEIVE_NEW_MESSAGE', { message: newMessage, campaign });
      return newMessage;
    },
  },
});
