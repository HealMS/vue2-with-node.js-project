<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="userMessage">
            <user-message></user-message>
        </div>
        <div class="box">用户名: 用户名</div>
        <div class="box">用户邮箱: 邮箱</div>
        <div class="box">用户电话: 电话</div>
        <div class="box">用户状态: 用户状态</div>
        <div class="box"><button>修改密码</button></div>
        <!-- 修改密码表单， 平时隐藏 -->
        <div>
            <div class="box"><label for="">输入旧密码: </label><input type="text" placeholder="输入旧密码"></div>
            <div class="box"><label for="">输入新密码: </label><input type="text" placeholder="输入新密码"></div>
            <div class="box"><button>修改密码</button></div>
        </div>
        <!-- end -->
        <div style="padding-top: 10px">
            <router-link :to="{path: '/sendEmail'}" tag="button">发送站内信</router-link>
        </div>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import MovieIndexHeader from "../components/movie/MovieIndexHeader"
    import CommonFooter from "../components/movie/CommonFooter"
    import Comment from "../components/movie/Comment"
    import UserMessage from "../components/movie/UserMessage"
    
    export default {
        components: {
            MovieIndexHeader,
            CommonFooter,
            Comment,
            UserMessage,
        },
    }
</script>
<style lang="css" scoped>
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }
    .container {
        width: 100%;
        margin: 0 auto;
    }
</style>