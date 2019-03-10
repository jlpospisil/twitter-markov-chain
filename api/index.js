const path = require('path');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const getTweets = require('./twitter/get-tweets');

// Variables
const apiDir = path.resolve(__dirname);
const rootDir = path.join(apiDir, '..');

// Load environment variables
['', '.local'].forEach(ext => dotenv.config({ path: path.join(rootDir, `.env${ext}`) }));

// Import requirements that depend on environment variables
const twitter = require('./twitter/client');

// Setup express app
const app = express();
const args = process.argv.slice(2);
const port = args.length > 0 ? args[0] : 4000;

// Add api routes
app.get('/tweets/:id', (req, res) => {
  let { id } = req.params;
  id = id.replace(/^@/, '');

  return res.send({
    tweets: getTweets(twitter, id),
  });
});

// Start app
app.listen(port, () => console.log(`API started on port ${port}!`));
