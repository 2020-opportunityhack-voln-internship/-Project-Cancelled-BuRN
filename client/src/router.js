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
      name: 'home',
      component: Home,
    },
    {
      path: '/campaign',
      name: 'campaign',
      component: () => import('./views/campaign/CampaignContainer.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/campaign/CampaignMain.vue'),
        },
        {
          path: 'new',
          component: () => import('./views/campaign/NewCampaign.vue'),
        },
      ],
    },
  ],
});
