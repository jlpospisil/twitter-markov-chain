import Vue from 'vue';

export default {
  UPDATE_TWITTER_TWEETS(state, tweets = []) {
    const words = tweets.reduce((a, v) => a.concat(v.split(/\s+/)), []);

    Vue.set(state, 'twitterTweets', tweets);
    Vue.set(state, 'twitterTweetWords', words);
  },

  UPDATE_TWEETS(state, tweets = []) {
    Vue.set(state, 'tweets', tweets);
  },
};
