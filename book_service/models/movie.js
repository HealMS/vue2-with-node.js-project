const mongoose = require("../common/db")
const movie = new mongoose.Schema({
    movieName: String,
    movieImg: String,
    movieVideo: String,
    movieDownload: String,
    movieTime: String,
    movieNumSuppose: Number,
    movieNumDownload: Number,
    movieMainPage: Boolean,
})
movie.statics.findAll = function(callBack) {
    this.find({}, callBack)
}

let movieModel = mongoose.model("movie", movie)

module.exports = movieModel