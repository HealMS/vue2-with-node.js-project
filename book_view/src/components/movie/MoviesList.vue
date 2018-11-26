<template lang="html">
    <div class="movieList">
        <div>
            <router-link :to="{path: '/movieDetail', query: {id: id}}" class="goods-list-link">
                {{movieName}}  {{movieTime}}
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['id', 'movieName', 'movieTime'],
        data() {
            return {
                movieTimeShow: ''
            }
        },
        create() {
            console.log(this.movieTime)
            this.movieTimeShow = new Date(this.movieTime).toLocaleString().replace(/:\d{1, 2}$/, " ")
        }   
    }
</script>
<style lang="css" scoped>
    .movieList {
        padding: 5px;
        border-bottom: 1px dashed #ababab;
    }
</style>