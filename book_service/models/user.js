let mongoose = require("../common/db")
let user = new mongoose.Schema({
    username: String,
    password: String,
    userMail: String,
    userPhone: String,
    userAdmin: Boolean,
    userPower: Number,
    userStop: Boolean,
})
// 用户查找方法
user.statics.findAll = function (callBack) {
    this.find({}, callBack)
}
//使用用户名查找
user.statics.findByUsername = function (name, callBack) {
    this.find({username: name}, callBack)
}
//登陆匹配是否拥有相同用户名和密码且没有处于封停状态
user.statics.findUserLogin = function (name, password, callBack) {
    this.find({username: name, password: password, userStop: false}, callBack)
}
//验证邮箱，电话和用户名找到用户
user.statics.findUserPassword = function (name, mail, phone, callBack) {
    this.find({username: name, userMail: mail, userPhone: phone}, callBack)
}

let userModel = mongoose.model("user", user)

module.exports = userModel