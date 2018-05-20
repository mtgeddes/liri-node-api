
require("dotenv").config();

// NPM - Packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var terminalLink = require('terminal-link');

var fs = require("fs");
var keys = require("./keys.js");
var data = fs.readFileSync("./random.txt", "utf8");

// Keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var search = process.argv[2];

function liriBot (a) {

    if (search === "my-tweets") {
        
        // Text colors
        var FgBlue = "\x1b[34m";
        var FgWhite = "\x1b[0m";
        var FgCyan = "\x1b[36m";

        var params = {screen_name: 'MatthewGeddes9'};
                    console.log ("Searching "+ FgCyan + "Twitter" + FgWhite + " for your tweets!\n");
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                    console.log(FgCyan + "----------Twitter Last 20 Tweets!----------\n" + FgWhite);
                for (i = 0; i < tweets.length && i < 20; i ++) {
                    console.log(FgCyan + (i + 1) + ": " + FgWhite + tweets[i].text);
                    console.log(FgCyan + "--" + FgWhite + " " + tweets[i].created_at.slice(0, 20));
                };
                    console.log(FgCyan + "\n-------------------------------------------" + FgWhite);
            };
        });
    } else if (search === "spotify-this-song") {
        
            var userSearch = process.argv;
            var songName = "";

            var FgGreen = "\x1b[32m";
            var FgWhite = "\x1b[0m";
            var FgCyan = "\x1b[36m";

            if (userSearch.length === 3) {
                songName = "The+sign+ace+of+base" //  If the user doesn't type a song in, the program will output data for the song "The Sign."
            } else {
                for (var i = 3; i < userSearch.length; i++) {
                    if (i > 3 && i < userSearch.length) {
                        songName = songName + "+" + userSearch[i];
                    } else {
                        songName += userSearch[i];
                    };
                };
            };
                console.log ("Searching "+ FgGreen + "Spotify" + FgWhite + " for your song\n");
            spotify.search({ type: 'track', query: songName }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }

                console.log(FgGreen + "----------Spotify Search Results!----------\n" + FgWhite);
                console.log(FgGreen + 'Artist(s): ' + FgWhite + data.tracks.items[0].artists[0].name);
                console.log(FgGreen + 'Song: ' + FgWhite + data.tracks.items[0].name);
                console.log(FgGreen + 'Album: ' + FgWhite + data.tracks.items[0].album.name);
                console.log(terminalLink(FgGreen + 'Preview:' + FgWhite, data.tracks.items[0].artists[0].external_urls.spotify));
                console.log(FgGreen + "\n-------------------------------------------" + FgWhite);
            });
    } else if (search === "movie-this") {
    
        var userSearch = process.argv;
        var movieName = "";

        // Text color variables
        var FgBlue = "\x1b[34m"
        var FgWhite = "\x1b[0m"
        var FgCyan = "\x1b[36m"
        
        if (userSearch.length === 3) {
            movieName = "Mr.+Nobody" //  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        } else {
            for (var i = 3; i < userSearch.length; i++) {
                if (i > 3 && i < userSearch.length) {
                    movieName = movieName + "+" + userSearch[i];
                } else {
                    movieName += userSearch[i];
                };
            };
        };

        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.key;

                console.log ("Searching "+ FgBlue + "OMDB" + FgWhite + " for your movie\n") 
        request(queryUrl, function(error, response, body) {
            
            if (error) {
                console.log(error);
            } else if (!error && response.statusCode === 200) {
                console.log(FgBlue + "----------Your Movie Search Results----------\n" + FgWhite);
                console.log(FgBlue + "Year: " + FgWhite + JSON.parse(body).Year);
                console.log(FgBlue + "Title: " + FgWhite + JSON.parse(body).Title);
                console.log(FgBlue + "Actors: " + FgWhite + JSON.parse(body).Actors);
                console.log(FgBlue + "Country: " + FgWhite + JSON.parse(body).Country);
                console.log(FgBlue + "Language: " + FgWhite + JSON.parse(body).Language);
                console.log(FgBlue + "IMDB Rating: " + FgWhite + JSON.parse(body).imdbRating);
                console.log(FgBlue + "Rotten Tomatoes Rating: " + FgWhite + JSON.parse(body).Ratings[1].Value);
                console.log(FgBlue + "Plot: " + FgWhite + JSON.parse(body).Plot);
                console.log(FgBlue + "\n---------------------------------------------" + FgWhite);
            }
        });
    } else if (search === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
              return console.log(error);
            }
            console.log(data);
            var dataArr = data.split(",");
            console.log(dataArr);
          });
        liriBot();
    } else {
        console.log("Not a valid input. Please use the following options: \n * my-tweets \n * spotify-this-song \n * movie-this \n * do-what-it-says")
    };
};
liriBot();