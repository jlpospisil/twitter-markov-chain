const fs = require('fs');
const path = require('path');

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

const getTweets = (twitter, id) => {
  const cacheFile = path.join(cacheDir, `${id}.json`);
  let tweets = null;

  // If the cached results exist and are less than a week old, use them
  // Otherwise, retrieve the tweets for the given user from twitter
  if (fs.existsSync(cacheFile) && getFileAgeInWeeks(cacheFile) === 0) {
    ({ tweets } = JSON.parse(fs.readFileSync(cacheFile).toString()) || {});
  } else {
    twitter.get('search/tweets', { q: `from:@${id}` }, (err, { statuses } = {}) => {
      if (statuses && Array.isArray(statuses)) {
        tweets = statuses;
        fs.writeFileSync(cacheFile, JSON.stringify({ tweets }, null, 2));
      }
    });
  }

  return tweets ? tweets.map(formatTweet) : null;
};

module.exports = getTweets;
