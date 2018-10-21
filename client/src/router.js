import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/campaign',
      name: 'Campaign',
      component: () => import('./views/campaign/CampaignContainer.vue'),
      children: [
        {
          path: '',
          name: 'CampaignList',
          component: () => import('./views/campaign/CampaignMain.vue'),
        },
        {
          path: 'new',
          name: 'NewCampaign',
          component: () => import('./views/campaign/NewCampaign.vue'),
        },
      ],
    },
  ],
});
