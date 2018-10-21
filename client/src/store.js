import Vue from 'vue';
import Vuex from 'vuex';
import papa from 'papaparse';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputcsv: {},
  },
  mutations: {
    csvParsed(state, data) {
    },
  },
  actions: {
    parse(context, file) {
      return new Promise((resolve, reject) => {
        papa.parse(file, {
          complete: (data) => {
            // context.commit('csvParsed', data);
            const objlist = data.data.map(row => ({
              name: row[0],
              phone: row[1],
              email: row[2],
            }));
            console.log(objlist);
            resolve(objlist);
          },
          error: (e) => {
            reject(e);
          },
        });
      });
    },
  },
});
