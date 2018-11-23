let mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/movieServer", {useNewUrlParser: true})
mongoose.Promise = global.Promise

module.exports = mongoose