/* 主页推荐 */
const mongoose = require("../common/db")
const recommend = new mongoose.Schema({
    recommendImg: String,
    recommendSrc: String,
    recommendTitle: String,
})

recommend.statics.findByIndexId = function(m_id, callBack) {
    this.find({findByIndexId: m_id}, callBack)
}
recommend.statics.findAll = function(callBack) {
    this.find({}, callBack)
}

let recommendModel = mongoose.model("recommend", recommend)

module.exports = recommendModel
