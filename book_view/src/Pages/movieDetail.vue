<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="contentMain">
            <h1>电影名称</h1>
            <div class="viewNum">下载次数: </div>
            <div><button>点击下载</button></div>
            <div><img class="headerImg"></div>
            <div class="btnPosition">
                <div class="SupportBtn">点赞</div>
            </div>
        </div>
        <comment v-bind:movie_id="movie_id"></comment>
        <common-footer></common-footer> 
    </div>
</template>
<script>
import MovieIndexHeader from "../components/movie/MovieIndexHeader";
import Comment from "../components/movie/Comment";
import CommonFooter from "../components/movie/CommonFooter";

export default {
  components: {
    MovieIndexHeader,
    Comment,
    CommonFooter
  }
};
</script>
<style lang="css" scoped>
    .headerImg {
        height: 200px;
    }
    .container {
        width: 100%;
        margin: 0 auto;
    }
    .contentMain {
        padding-top: 150px;
    }
    .btnPosition {
        padding-left: 48%;
    }
    .SupportBtn {
        border: 1px solid #000;
        width: 60px;
    }
    .ViewNum {
        font-size: 10px;
    }
</style>