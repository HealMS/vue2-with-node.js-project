<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="contentMain">
            <h1>{{movieName}}</h1>
            <div class="viewNum">下载次数: {{downloadNum}}</div>
            <div><button>点击下载</button></div>
            <div><img class="headerImg"></div>
            <div class="btnPosition">
                <div class="SupportBtn" v-on:click="support">点赞<div>{{supportNum}}</div></div>
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
import axios from "axios"

export default {
  components: {
    MovieIndexHeader,
    Comment,
    CommonFooter
  },
  data() {
      return {
        movie_id: "",
        movieName: "",
        downloadNum: 0,
        supportNum: 0,
      }
  },
  created() {
    this.movie_id = this.$route.query.id
    axios.post("http://localhost:3000/users/detail", {id: this.movie_id})
        .then(res => {
            this.movieName = res.data.data.movieName
            this.supportNum = res.data.data.movieNumSuppose
            this.downloadNum = res.data.data.movieNumDownload
        }).catch(err => console.log(err))
  },
  methods: {
      support(event) {
          axios.post("http://localhost:3000/users/support", {movie_id: this.movie_id})
            .then(res => {
                if(res.data.status === 0) {
                    console.log("点赞成功")
                    let that = this
                    axios.post("http://localhost:3000/users/detail", {id: this.movie_id})
                        .then(res => {
                            that.supportNum = res.data.data.movieNumSuppose
                        }).catch(err => alert(err))
                }
            }).catch(err => alert(err))
      },
      movieDownload(event) {
          axios.post("http://")
      }
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