<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="contentMain">
            <h1>文章标题</h1>
            <div>文章的发布时间</div>
            <div class="contentText">文章的内容</div>
        </div>
        <comment></comment>
        <common-footer></common-footer> 
    </div>
</template>
<script>
    import MovieIndexHeader from "../components/movie/MovieIndexHeader"
    import CommonFooter from "../components/movie/CommonFooter"
    import Comment from "../components/movie/Comment"

    export default {
        name: "NewsDetail",
        components: {
            MovieIndexHeader,
            CommonFooter,
            Comment,
        }
    }
</script>
<style lang="css" scoped>
    .container {
        width: 100%;
        margin: 0 auto;
    }
    .contentMain {
        padding-top: 150px;
    }
    .contentText {
        font-size: 15px;
        padding-top: 20px;
    }
</style>