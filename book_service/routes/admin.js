/**
 * 后台API开发 (管理员)
 */
const user = require("../models/user")
const movie = require("../models/movie")
const comment = require("../models/comment")
const article = require("../models/article")
const recommend = require("../models/recommend")
const utils = require("../public/javascripts/utils")
const express = require("express")
const router = express.Router()
/* admin 添加电影 */
router.post("/movieAdd", (req, res, next) => {
    let movieMainPage = true
    let username = req.body.username
    let token = req.body.token
    let id = req.body.id  /* 操作用户的ID */
    let movieName = req.body.movieName
    let movieImg = req.body.movieImg
    let movieDownload = req.body.movieDownload
    if (!username) res.json({ status: 1, message: "用户名为空" })
    if (!token) res.json({ status: 1, message: "登录出错" })
    if (!id) res.json({ status: 1, message: "用户传递错误" })
    if (!movieName) res.json({ status: 1, message: "电影名称为空" })
    if (!movieImg) res.json({ status: 1, message: "电影图片为空" })
    if (!movieDownload) res.json({ status: 1, message: "电影下载地址为空" })
    if (!req.body.movieMainPage) {
        movieMainPage = false
    }
    const check = checkAdminPower(token, id)
    if (check.error === 0) {
        user.findByUsername(username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                let saveMovie = new movie({
                    movieName: movieName,
                    movieImg: movieImg,
                    movieVideo: req.body.movieVideo,
                    movieDownload: movieDownload,
                    movieTime: new Date(),
                    movieNumSuppose: 0,
                    movieNumDownload: 0,
                    movieMainPage: movieMainPage,
                })
                saveMovie.save((err) => {
                    if (err) {
                        res.json({ status: 1, message: err })
                    } else {
                        res.json({ status: 0, message: "添加成功" })
                    }
                })
            } else {
                res.json({ status: 1, message: "用户无权限或者已停用" })
            }
        })
    }
})
/* admin 删除电影 */
router.post("/movieDel", (req, res, next) => {
    if (!req.body.movieId) res.json({ status: 1, message: "电影id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                movie.remove({ _id: req.body.movieId }, (err, delMovie) => {
                    if (err)
                        res.json({ status: 1, message: "不存在该电影" })
                    else
                        res.json({ status: 0, message: "删除成功", data: delMovie })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或者已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 管理员更新电影 */
router.post("/movieUpdate", (req, res, next) => {
    if (!req.body.movieId) res.json({ status: 1, message: "电影id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    let saveData = JSON.parse(req.body.movieInfo)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                movie.update({ _id: req.body.movieId }, saveData, (err, updateMovie) => {
                    res.json({ status: 0, message: "更新成功", data: updateMovie })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或者已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 获取全部电影 */
router.get("/movie", (req, res, next) => {
    movie.findAll((err, allMovies) => {
        res.json({ status: 0, message: "获取成功", data: allMovies })
    })
})
/* 获取全部评论 */
router.get("/comment", (req, res, next) => {
    comment.findAll((err, allComments) => {
        res.json({ status: 0, message: "获取成功", data: allComments })
    })
})
/* 管理员审核评论 */
router.post("/checkComment", (req, res, next) => {
    if (!req.body.commentId) res.json({ status: 1, message: "评论id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                comment.update({ _id: req.body.commentId }, { check: true }, (err, checkComment) => {
                    res.json({ status: 0, message: "审核成功", data: checkComment })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或者已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 管理员删除评论 */
router.post("/delComment", (req, res, next) => {
    if (!req.body.commentId) res.json({ status: 1, message: "评论id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                comment.remove({ _id: req.body.commentId }, (err, delComment) => {
                    res.json({ status: 0, message: "删除成功", data: delComment })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或者已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 封停用户 */
router.post("/stopUser", (req, res, next) => {
    if (!req.body.userId) res.json({ status: 1, message: "用户id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({ _id: req.body.userId }, { userStop: true }, (err, updateUser) => {
                    res.json({ status: 0, message: "封停成功", data: updateUser })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 更新用户密码 */
router.post("/changeUser", (req, res, next) => {
    if (!req.body.userId) res.json({ status: 1, message: "用户id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    if (!req.body.newPassword) res.json({ status: 1, message: "用户新密码为空" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({ _id: req.body.userId }, { password: req.body.newPassword }, (err, updateUser) => {
                    res.json({ status: 0, message: "修改成功", data: updateUser })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 显示所有用户 */
router.post("/showUser", (req, res, next) => {
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.findAll((err, allUsers) => {
                    res.json({ status: 0, message: "获取成功", data: allUsers })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 修改用户权限 */
router.post("/stopUser", (req, res, next) => {
    if (!req.body.userId) res.json({ status: 1, message: "用户id传递失败" })
    if (!req.body.username) res.json({ status: 1, message: "用户名为空" })
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findByUsername(req.body.username, (err, findUser) => {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({ _id: req.body.userId }, { userAdmin: true }, (err, updateUser) => {
                    res.json({ status: 0, message: "修改成功", data: updateUser })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 添加新文章 */
router.post("/articleAdd", (req, res, next) => {
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    if (!req.body.articleTitle) res.json({ status: 1, message: "文章标题为空" })
    if (!req.body.articleContext) res.json({ status: 1, message: "文章内容为空" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findById(req.body.id, (err, findUser) => {
            if (findUser.userAdmin && !findUser.userStop) {
                let saveArticle = new article({
                    articleTitle: req.body.articleTitle,
                    articleContext: req.body.articleContext,
                    articleTime: new Date(),
                })
                saveArticle.save(err => {
                    if (err)
                        res.json({ status: 1, message: err })
                    else
                        res.json({ status: 0, message: "添加成功", data: saveArticle })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 删除文章 */
router.post("/delArticle", (req, res, next) => {
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    if (!req.body.articleId) res.json({ status: 1, message: "文章id传递失败" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findById(req.body.id, (err, findUser) => {
            if (findUser.userAdmin && !findUser.userStop) {
                article.remove({ _id: req.body.articleId }, (err, delArticle) => {
                    res.json({ status: 0, message: "删除成功", data: delArticle })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 主页推荐 */
router.post("/addRecommend", (req, res, next) => {
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    if (!req.body.recommendImg) res.json({ status: 1, message: "推荐图片为空" })
    if (!req.body.recommendSrc) res.json({ status: 1, message: "推荐跳转地址为空" })
    if (!req.body.recommendTitle) res.json({ status: 1, message: "推荐标题为空" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findById(req.body.id, (err, findUser) => {
            if (findUser.userAdmin && !findUser.userStop) {
                let saveRecommend = new recommend({
                    recommendImg: req.body.recommendImg,
                    recommendSrc: req.body.recommendSrc,
                    recommendTitle: req.body.recommendTitle,
                })
                saveRecommend.save(err => {
                    if (err)
                        res.json({ status: 1, message: err })
                    else
                        res.json({ status: 0, message: "保存成功" })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})
/* 删除热点信息 */
router.post("/delRecommend", (req, res, next) => {
    if (!req.body.token) res.json({ status: 1, message: "登录出错" })
    if (!req.body.id) res.json({ status: 1, message: "管理员用户传递错误" })
    if (!req.body.recommendId) res.json({ status: 1, message: "热点id传递失败" })
    let check = checkAdminPower(req.body.token, req.body.id)
    if (check.error === 0) {
        user.findById(req.body.id, (err, findUser) => {
            if (findUser.userAdmin && !findUser.userStop) {
                recommend.remove({ _id: req.body.recommendId }, (err, delArticle) => {
                    res.json({ status: 0, message: "删除成功", data: delArticle })
                })
            } else {
                res.json({ status: 1, message: "用户无权限或已停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
})

/* 验证是否有这号人 */
function checkAdminPower(token, id) {
    if (token === utils.getMD5Password(id)) {
        return { error: 0, message: "用户登录成功" }
    } else {
        return { error: 1, message: "用户登录失败" }
    }
}

module.exports = router