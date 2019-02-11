require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var cmdType = process.argv[2];
var artist = process.argv.slice(3).join(" ");

// if(cmdType === "concert-this"){
//     axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(res){
//         var responseData = res.data;
//         for(var i=0; i<responseData.length; i++){
//             console.log(`
//             Venue: ${responseData[i].venue.name}
//             Location: ${responseData[i].venue.city}
//             Start Date: ${moment(responseData[i].datetime).format("L")}
//         `);
//         }
        
//     });
// }

switch(cmdType){
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(res){
            var responseData = res.data;
            for(var i=0; i<responseData.length; i++){
                console.log(`
                Venue: ${responseData[i].venue.name}
                Location: ${responseData[i].venue.city}
                Start Date: ${moment(responseData[i].datetime).format("L")}
            `);
            }
        });
        break;
    case "spotify-this-song":
        spotify.request("https://api.spotify.com/v1/" + artist).then(function(res){
            var responseData = res.data;
            console.log(responseData);
            // for(var i=0; i<responseData.length; i++){
            //     console.log(`
            //         Artist(s): ${responseData}
            //         Song Title: ${responseData}
            //         Preview Link: ${responseData}
            //         Album: ${responseData}
            //     `);
            // }
        });
        break;
    case "movie-this":
        axios.get("http://www.omdbapi.com/?t=" + artist + "&apikey=trilogy").then(function(res){
            var responseData = res.data;
            console.log(`
                Movie: ${responseData.Title}
                Release Year: ${responseData.Year}
                IMDB Rating: ${responseData.Ratings[0].Value}
                Rotten Tomatoes Rating : ${responseData.Ratings[1].Value}
                Country where the movie was produced: ${responseData.Ratings[2].Value}
                Language of the movie: ${responseData.Language}
                Plot: ${responseData.Plot}
                Actors: ${responseData.Actors}
            `);
        });
        break;
}