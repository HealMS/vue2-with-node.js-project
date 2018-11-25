<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="contentMain">
            <div class="contentLeft">
                <ul class="cont-ul contentText">
                    <movies-list></movies-list>
                </ul>
            </div>
        </div>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import MovieIndexHeader from "../components/movie/MovieIndexHeader"
    import CommonFooter from "../components/movie/CommonFooter"
    import MoviesList from "../components/movie/MoviesList"
    export default {
        components: {
            MovieIndexHeader,
            CommonFooter,
            MoviesList,
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
    .containText {
        font-size: 15px;
        padding-top: 20px;        
    }
</style>