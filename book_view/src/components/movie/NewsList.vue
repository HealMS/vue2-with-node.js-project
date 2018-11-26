<template>
    <li class="goods-list">
        <div class="newsList">
            <router-link :to="{path: '/newsDetail', query: {id: id}}" class="goods-list-link">
                {{articleTitle}}  {{articleTime}}
            </router-link>
        </div>
    </li>
</template>
<script>
    export default {
        props: ["id", "articleTitle", "articleTime"]
    }
</script>
<style lang="css" scoped>
    .newsList {
        padding: 5px;
        font-size: 10px;
        border-bottom: 1px solid #ababab;
    }
</style>