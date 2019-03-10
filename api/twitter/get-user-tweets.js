const fs = require('fs');
const path = require('path');

const twitterDevEnvironment = process.env.TWITTER_DEV_ENV;
const dir = path.resolve(__dirname);
const cacheDir = path.join(dir, '..', 'cache');
const weekInMs = 7 * 24 * 60 * 60 * 1000;
const getFileTimestamp = file => fs.statSync(file).mtime;
const getFileAgeInWeeks = file => Math.round((new Date() - getFileTimestamp(file)) / weekInMs);

const formatTweet = (tweet) => {
  let { text = '' } = tweet;
  const { entities = {} } = tweet;
  const { urls = [] } = entities;

  urls.forEach((url) => {
    text = text.replace(url.url, url.expanded_url);
  });

  return text;
};

const processTwitterData = (data) => {
  const { results: tweets } = data;
  return tweets ? tweets.map(formatTweet) : null;
};

const getUserTweets = (twitter, id) => new Promise((resolve, reject) => {
  const cacheFile = path.join(cacheDir, `${id}.json`);
  let data = {};

  // If the cached results exist and are less than a week old, use them
  // Otherwise, retrieve the tweets for the given user from twitter
  if (fs.existsSync(cacheFile) && getFileAgeInWeeks(cacheFile) === 0) {
    data = JSON.parse(fs.readFileSync(cacheFile).toString());
    resolve(processTwitterData(data));
  } else {
    const url = `/tweets/search/30day/${twitterDevEnvironment}.json`;
    twitter.get(url, { query: `from:${id}` }, (err, tweetData, response) => {
      data = tweetData;
      if (response.statusCode === 200) {
        fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
        resolve(processTwitterData(data));
      } else {
        reject(err);
      }
    });
  }
});

module.exports = getUserTweets;
