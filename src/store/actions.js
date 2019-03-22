import axios from 'axios';

export default {
  getTweetsFromTwitter({ commit, state }) {
    const { userId } = state;

    return axios.get(`/tweets/${userId}`).then((response) => {
      const { data = {} } = response;
      const { tweets } = data;
      commit('UPDATE_TWITTER_TWEETS', tweets);
    });
  },

  generateTweets({ commit, state, getters }, { real = 5, fake = 5 } = {}) {
    const { twitterTweets, twitterTweetWords } = state;
    const { nextWord } = getters;
    const minTweetLength = 100;
    const maxTweetLength = 150;
    const fakeTweets = [];
    const realNum = Math.min(real, twitterTweets.length);
    const randomTweets = realNum === twitterTweets.length ? twitterTweets : [];

    // Select desired number of real tweets randomly
    while (randomTweets.length < realNum) {
      const i = Math.floor(Math.random() * twitterTweets.length);
      const randomTweet = twitterTweets[i];

      if (!randomTweets.includes(randomTweet)) {
        randomTweets.push({ real: true, text: randomTweet });
      }
    }

    // Generate desired number of fake tweets using markov chain
    for (let c = 0; c < fake; c += 1) {
      const length = Math.floor(Math.random() * (maxTweetLength - minTweetLength)) + minTweetLength;
      const i = Math.floor(Math.random() * twitterTweetWords.length);
      let word = twitterTweetWords[i];
      let tweet = word;

      while (tweet.length < length) {
        word = nextWord(word);
        tweet += ` ${word}`;
      }

      tweet = tweet.charAt(0).toUpperCase() + tweet.slice(1);

      fakeTweets.push({ real: false, text: tweet });
    }

    // Combine real and fake tweets and shuffle
    const tweets = randomTweets.concat(fakeTweets);

    for (let j = tweets.length - 1; j > 0; j -= 1) {
      const k = Math.floor(Math.random() * (j + 1));
      [tweets[j], tweets[k]] = [tweets[k], tweets[j]];
    }

    // Update vuex store
    commit('UPDATE_TWEETS', tweets);
  },
};
