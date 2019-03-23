import Vue from 'vue';
import Router from 'vue-router';
import Tweets from './views/Tweets.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'home',
      component: Tweets,
    },
  ],
});
