<template>
    <div class="container">
        <movie-index-header></movie-index-header> <!-- 主页header组件 -->
        <div class="userMessage">
            <user-message></user-message> <!-- 用户信息组件 -->
        </div>
        <div class="contentPic">
            <index-header-pic v-for="item in headerItems" :key="item._id" :recommendImg="item.recommendImg"
            :recommendSrc="item.recommendSrc" :recommendTitle="item.recommendTitle">
                </index-header-pic> <!-- 电影大图组件 -->
        </div>
        <div class="contentMain">
            <div class="contentLeft">
                <ul class="cont-ul">
                    <movies-list v-for="item in movieItems" :key="item._id" :id="item._id"
                    :movieName="item.movieName" :movieTime="item.movieTime"></movies-list> <!-- 电影列表组件 -->
                </ul>
            </div>
            <div class="contentRight">
                <ul class="cont-ul">
                    <news-list v-for="item in newsItems" :key="item._id" :id="item._id"
                    :articleTitle="item.articleTitle" :articleTime="item.articleTime"></news-list> <!-- 新闻列表组件 -->
                </ul>
            </div>
        </div>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import MovieIndexHeader from "../components/movie/MovieIndexHeader"
    import UserMessage from "../components/movie/UserMessage"
    import IndexHeaderPic from "../components/movie/IndexHeaderPic"
    import MoviesList from "../components/movie/MoviesList"
    import NewsList from "../components/movie/NewsList"
    import CommonFooter from "../components/movie/CommonFooter"
    import axios from "axios"

    export default {
        data() {
            return {
                headerItems: [],
                newsItems: [],
                movieItems: [],
            }
        },
        components: {
            MovieIndexHeader,
            UserMessage,
            IndexHeaderPic,
            MoviesList,
            NewsList,
            CommonFooter,
        },
        created() {
            axios.get("http://localhost:3000/showIndex").then(res => {
                this.headerItems = res.data.data  
            }).catch(err => console.log(err))
            axios.get("http://localhost:3000/showArticle").then(res => {
                this.newsItems = res.data.data                
            }).catch(err => console.log(err))
            axios.get("http://localhost:3000/showRanking").then(res => {
                this.movieItems = res.data.data
            }).catch(err => console.log(err))
        },
    }
</script>
<style lang="css" scoped>
    .container {
        width: 100%;
        height: 0 auto;
    }
    .contentMain {
        height: 50px;
    }
    .userMessage {
        margin-left: -10px;
    }
    .contentPic {
        padding-top: 5px;
    }
    .contentLeft {
        width: 60%;
        float: left;
        margin-top: 5px;
        border-top: 1px solid #000;
    }
    .contentRight {
        width: 39%;
        float: left;
        margin-left: 1%;
        margin-top: 5px;
        border-top: 1px solid #000;
    }
    .cont-ul {
        padding-top: 0.5em;
        background-color: #fff;
    }
    .cont-ul::after {
        clear: both;
        content: '';
        display: block;
        width: 0;
        height: 0;
    }
</style>
