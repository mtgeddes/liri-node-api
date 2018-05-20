
var FgYellow = "\x1b[33m"
var FgWhite = "\x1b[37m"
console.log('\nYour ' + FgYellow + 'keys' + FgWhite + ' are loaded\n');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
  key: process.env.OMDB_API_KEY
};



