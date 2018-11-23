const mongoose = require("../common/db")
/* comment database */
const comment = new mongoose.Schema({
    movie_id: String,
    username: String,
    context: String,
    check: Boolean
})

comment.statics.findByMovieId = function(m_id, callBack) {
    this.find({movie_id: m_id, check: true}, callBack)
}

comment.statics.findAll = function(callBack) {
    this.find({}, callBack)
}

let commentModel = mongoose.model("comment", comment)

module.exports = commentModel