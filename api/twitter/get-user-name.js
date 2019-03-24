const getUserTweets = require('./get-user-tweets');

const getUserName = (twitter, id) => new Promise(async (resolve, reject) => {
  const { results: tweets } = await getUserTweets(twitter, id, false);

  if (tweets.length > 0) {
    const { name } = tweets[0].user || {};
    resolve(name);
  }

  resolve(null);
});

module.exports = getUserName;
