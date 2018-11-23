const mongoose = require("../common/db")
const article = new mongoose.Schema({
    articleTitle: String,
    articleContext: String,
    articleTime: String,
})

article.statics.findByArticleId = function(id, callBack) {
    this.find({_id, id}, callBack)
}
article.statics.findAll = function(callBack) {
    this.find({}, callBack)
}

let articleModel = mongoose.model("article", article)

module.exports = articleModel