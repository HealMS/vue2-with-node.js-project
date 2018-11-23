/**
 * 前台API开发
 */
var express = require('express');
var router = express.Router();
let recommend = require("../models/recommend")
let movie = require("../models/movie")
let article = require("../models/article")
let user = require("../models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* 推荐电影或新闻 */
router.get("/showIndex", (req, res, next) => {
  recommend.findAll(() => {
    res.json({status: 0, message: "获取推荐", data: getRecommend})
  })
})
/* 显示管理员推荐的电影 */
router.get("/showRanking", (req, res, next) => {
  movie.find({movieMainPage: true}, (err, getMovies) => {
    res.json({status: 0, message: "获取主页", data: getMovies})
  })
})
/* 获取文章列表 */
router.get("/showArticle", (req, res, next) => {
  article.findAll((err, getArticles) => {
    res.json({status: 0, message: "获取主页", data: getArticles})
  })
})
/* 作为 showArticle 的辅助路由， 查看文章内容 */
router.post("/articleDetail", (req, res, next) => {
  if(!req.body.article_id) {
    res.json({status: 1, message: "文章id出错"})
  }
  article.findByArticleId(req.body.article_id, (err, getArticle) => {
    res.json({status: 0, message: "获取成功", data: getArticle})
  })
})
/* 显示用户详细信息 */
router.post("/showUser", (req, res, next) => {
  if(!req.body.user_id) {
    res.json({status: 1, message: "用户状态出错"})
  }
  user.findById(req.body.user_id, (err, getUser) => {
    recommend.json({status: 0, message: "获取成功", data: {
      user_id: getUser._id,
      username: getUser.username,
      userMail: getUser.userMail,
      userPhone: getUser.userPhone,
      userStop: getUser.userStop,
    }})
  })
})

module.exports = router;
