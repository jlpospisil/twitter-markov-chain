const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
const apiDir = path.resolve(__dirname);
const rootDir = path.join(apiDir, '..');
['', '.local'].forEach(ext => dotenv.config({ path: path.join(rootDir, `.env${ext}`) }));

// Import requirements that depend on environment variables
const twitter = require('./twitter/client');
const getUserTweets = require('./twitter/get-user-tweets');
const getUserName = require('./twitter/get-user-name');

// Setup express app
const app = express();
const args = process.argv.slice(2);
const port = args.length > 0 ? args[0] : 4000;

// Add api routes
app.get('/tweets/:id', async (req, res) => {
  let { id } = req.params;
  id = id.replace(/^@/, '').toLowerCase();

  if (!id) {
    return res.send({ userName: null, tweets: [] });
  }

  const tweets = await getUserTweets(twitter, id);
  const userName = await getUserName(twitter, id);

  return res.send({ userName, tweets });
});

// Start app
app.listen(port, () => console.log(`API started on port ${port}!`));
