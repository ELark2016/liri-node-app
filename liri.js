require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var nodeArgv = process.argv;
var command = process.argv[2];

// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (command) {
case "my-tweets":
  tweet();
  break;

case "spotify-this-song":
  song();
  break;

case "movie-this":
  movie();
  break;

case "do-what-it-says":
  doIt();
  break;
}

function tweet () {
    var client = new Twitter(keys.twitter);
    var queryUrl = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=@Elizabe80644575&count=20";
    client.get(queryUrl, function(error, tweets, response) {
        console.log(tweets);
        // console.log("Created on: " + JSON.parse(response).created_at);
 
     });
}

function song (songName) {
    var spotify = new Spotify(keys.spotify);
    var songName = process.argv[3];
    spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {
        for (var i = 0; i < 20; i++){
            var results = response.tracks.items[i];
            var artist = results.artists[0].name;
            var track = results.name;
            var album = results.album;
            var preview = results.preview_url;
            console.log(`
            Artist(s):    ${artist}
            Song Name:    ${track}
            Album:        ${album}
            Preview Link: ${preview}
              `);
        }
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movie() {
    var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}