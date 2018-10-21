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
      path: '/report',
      name: 'Report',
      component: () => import('./views/Report.vue'),
    },
    {
      path: '/campaign',
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
        {
          path: '/campaign/:id/edit',
          name: 'EditCampaign',
          props: true,
          component: () => import('./views/campaign/EditCampaign.vue'),
        },
        {
          path: '/campaign/:id/send',
          name: 'SendCampaign',
          props: true,
          component: () => import('./views/campaign/SendCampaign.vue'),
        },
      ],
    },
  ],
});
