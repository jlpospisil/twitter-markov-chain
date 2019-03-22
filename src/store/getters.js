export default {
  nextWord: state => (word) => {
    const { twitterTweetWords } = state;
    const nextWords = twitterTweetWords.reduce((a, v, i) => {
      if (v === word && i < twitterTweetWords.length - 2) {
        a.push(twitterTweetWords[i + 1]);
      }
      return a;
    }, []);

    return nextWords[Math.floor(Math.random() * nextWords.length)];
  },
};
