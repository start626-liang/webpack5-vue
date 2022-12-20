import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/main/default' },
    {
      "path": "/main/:id",
      component: () => import('../view/main.vue')
    }
  ]
})

export default router