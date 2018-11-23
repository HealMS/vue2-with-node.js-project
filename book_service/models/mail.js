const mongoose = require("../common/db")
/* 站内信模块 user to another user */
const mail = new mongoose.Schema({
    fromUser: String,
    toUser: String,
    title: String,
    context: String,
})
mail.statics.findBytoUserId = function(user_id, callBack) {
    this.find({toUser: user_id}, callBack)
}
mail.statics.findByFromUserId = function(user_id, callBack) {
    this.find(fromUser, callBack)
}

let mailModel = mongoose.model("mail", mail)

module.exports = mailModel