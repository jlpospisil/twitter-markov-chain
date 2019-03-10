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

// Setup express app
const app = express();
const args = process.argv.slice(2);
const port = args.length > 0 ? args[0] : 4000;

// Add api routes
app.get('/tweets/:id', async (req, res) => {
  let { id } = req.params;
  id = id.replace(/^@/, '');
  const tweets = await getUserTweets(twitter, id);
  return res.send({ tweets });
});

// Start app
app.listen(port, () => console.log(`API started on port ${port}!`));
