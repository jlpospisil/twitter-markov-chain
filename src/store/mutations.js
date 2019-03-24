import Vue from 'vue';

export default {
  TOGGLE_REVEAL(state) {
    const { reveal } = state;
    Vue.set(state, 'reveal', !reveal);
  },

  TOGGLE_SCORING(state) {
    const { scoring } = state;
    Vue.set(state, 'scoring', !scoring);
  },

  TOGGLE_SELECTED(state, index) {
    const { tweets } = state;
    if (typeof tweets[index] !== 'undefined') {
      const { selected = false } = tweets[index];
      Vue.set(tweets[index], 'selected', !selected);
    }
  },

  UPDATE_TWITTER_TWEETS(state, tweets = []) {
    const words = tweets.reduce((a, v) => a.concat(v.split(/\s+/)), []);

    Vue.set(state, 'twitterTweets', tweets);
    Vue.set(state, 'twitterTweetWords', words);
  },

  UPDATE_TWEETS(state, tweets = []) {
    Vue.set(state, 'tweets', tweets);
  },

  UPDATE_USER_ID(state, userId) {
    Vue.set(state, 'userId', userId);
  },

  UPDATE_USER_NAME(state, userName) {
    Vue.set(state, 'userName', userName);
  },
};
