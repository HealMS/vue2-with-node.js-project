/**
 * 用户系统开发
 */

var express = require('express');
var router = express.Router();
let user = require("../models/user")
let utils = require("../public/javascripts/utils")
let movie = require("../models/movie")
let mail = require("../models/mail")
let comment = require("../models/comment")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* {status(0正常，1出错)， message(错误信息或是成功提示)， data(服务器传送的数据)} */
router.post('/register', (req, res, next) => {
  if(!req.body.username) {
    res.json({status: 1, message: "用户名为空"})
  }
  if(!req.body.password) {
    res.json({status: 1, message: "密码为空"})
  }
  if(!req.body.userMail) {
    res.json({status: 1, message: "用户邮箱为空"})
  }
  if(!req.body.userPhone) {
    res.json({status: 1, message: "用户手机为空"})
  }
  user.findByUsername(req.body.username, (err, userSave) => {
    console.log(userSave)
    if(userSave.length) {
      res.json({status: 1, message: "用户已注册"})
    } else {
      let registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 0,
        userPower: 0,
        userStop: 0,
      })

      registerUser.save(() => {
        res.json({status: 0, message: "注册成功"})
      })
    }
  })
})

/* 登录路由验证模块 */
router.post("/login", (req, res, next) => {
  if(/* !/^[a-zA-Z0-9]{6, 18}$/.test(req.body.username.trim()) */!req.body.username.trim()) {
    res.json({status: 1, message: "用户名长度必须在6-18之间"})
  }
  if(/* !/^.{6-18}$/.test(req.body.password) */!req.body.password.trim()) {
    res.json({status: 1, message: "密码长度必须在6-18之间"})
  }
  user.findUserLogin(req.body.username, req.body.password, (err, userSave) => {
    if(err) res.json({status:1, message: "error!"})
    if(userSave.length) {
      let token_after = utils.getMD5Password(userSave[0].id)
      res.json({status: 0, data: {token: token_after, user: userSave, message: "用户登录成功"}})
      /* 验证成功则返回给用户token储存在本地 */
    } else {
      res.json({status: 1, message: "用户名或密码错误"})
    }
  })
})

/* 找回密码模块 */
router.post("/findPassword", (req, res) => {
  if(req.body.repassword) {
    /* 检查是否登录 token存在则还未登录 */
    if(req.body.token) {
      if(!req.body.user_id) {
        res.json({status: 1, message: "用户登录错误"})
      }
      if(!req.body.password) {
        res.json({status: 1, message: "用户老密码错误"})
      }
      if(req.body.token === utils.getMD5Password(req.body.user_id)) {
        user.findOne({_id: req.body.user_id, password: req.body.password}, (err, checkUser) => {
          user.update({_id: req.body.user_id}, {password: req.body.repassword}, (err, userUpdate) => {
            if(err) {
              res.json({status: 1, message: "更改错误", data: err})
            }
            res.json({status: 0, message: "更改成功", data: userUpdate})
          })
        })
      } else {
        res.json({status:1, message: "用户登录错误"})
      }
    } else {
      /* 不存在token 说明已经登录 */
      user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, (err, userFound) => {
        if(userFound.length) {
          user.update({_id: userFound[0]._id}, {password: req.body.repassword}, (err, userUpdate) => {
            if(err) {
              res.json({status: 1, message: "更改错误", data: err})
            }
            res.json({status: 0, message: "更改成功", data: userUpdate})
          })
        } else {
          res.json({status: 1, message: "信息错误"})
        }
      })
    }
  } else {
    if(!req.body.username) {
      res.json({status: 1, message: "用户名称为空"})
    }
    if(!req.body.userMail) {
      res.json({status: 1, message: "用户邮箱为空"})
    }
    if(!req.body.userPhone) {
      res.json({status: 1, message: "用户手机为空"})
    }
    user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, (err, userFound) => {
      if(userFound.length) {
        res.json({status: 0, message: "验证成功， 请修改密码", data: {
          username: req.body.username,
          userMail: req.body.userMail,
          userPhone: req.body.userPhone,
        }})
      } else {
        res.json({status: 1, message: "信息错误"})
      }
    })
  }
})

router.post("/postComment", (req, res, next) => {
  let username = "匿名用户"
  if(!req.body.movie_id) {
    res.json({status: 1, message: "电影id为空"})
  }
  if(!req.body.context) {
    res.json({status: 1, message: "评论内容为空"})
  }
  const saveComment = new comment({
    movie_id: req.body.movie_id,
    username: req.body.username ? req.body.username : username,
    context: req.body.context,
    check: 0,
  })
  saveComment.save((err) => {
    if(err) {
      res.json({status: 1, message: err})
    } else {
      res.json({status: 0, message: "评论成功"})
    }
  })
})
/* 电影点赞 */
router.post("/support", (req, res, next) => {
  if(!req.body.movie_id) {
    res.json({status: 1, message: "电影id传递失败"})
  }
  console.log(movie)
  movie.findById(req.body.movie_id, (err, supportMovie) => {
    movie.update({_id: req.body.movie_id}, {movieNumSuppose: supportMovie.movieNumSuppose + 1}, (err) => {
      if(err) {
        res.json({status: 1, message: "点赞失败", data: err})
      } else {
        res.json({status: 0, message: "点赞成功"})
      }
    })
  })
})
/* 电影下载 */
router.post("/download", (req, res, next) => {
  if(!req.body.movie_id) {
    res.json({status: 1, message: "电影id传递失败"})
  } else {
    movie.findById(req.body.movie_id, (err, downloadMovie) => {
      movie.update({_id: req.body.movie_id}, {movieNumDownload: downloadMovie.movieNumDownload + 1}, (err) => {
        if(err) {
          res.json({status: 1, message: "下载失败"})
        } else {
          res.json({status: 0, message: "下载成功", data: downloadMovie.movieDownload})
        }
      })
    })
  }
})
/* 电影详情 */
router.post("/detail", (req, res, next) => {
  movie.findById({_id: req.body.id}, (err, findMovie) => {
    res.json({status: 0, message: "获取成功", data: findMovie})
  })
})

router.post("/sendEmail", (req, res) => {
  if(!req.body.token) { 
    /* 用户登录状态 */
    res.json({status: 1, message: "用户登录状态错误"})
  }
  if(!req.body.user_id) {
    res.json({status: 1, message: "用户登录状态出错"})
  }
  if(!req.body.toUserName) {
    res.json({status: 1, message: "为选择相关用户"})
  }
  if(!req.body.title) {
    res.json({status: 1, message: "标题不能为空"})
  }
  if(!req.body.content) {
    res.json({status: 1, message: "内容不能为空"})
  }
  if(req.body.token == utils.getMD5Password(req.body.user_id)) {
    user.findByUsername(req.body.toUserName, (err, toUser) => {
      if(toUser.length) {
        let newEmail = new mail({
          fromUser: req.body.user_id,
          toUser: toUser[0]._id,
          title: req.body.title,
          content: req.body.content,
        })
        newEmail.save((err) => {
          res.json({status: 0, message: "发送成功"})
        })
      } else {
        res.json({status: 1, message: "您发送的对象不存在"})
      }
    })
  } else {
    res.json({status: 1, message: "用户登录错误"})
  }
})

module.exports = router;
