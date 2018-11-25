<template>
    <div class="header">
        <router-link to="/LoginPage">
            <div class="header_menu">登录</div>
        </router-link>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="css" scoped>
    .header {
        width: 103%;
        height: 30px;
        margin: 0;
        background-color: #c3bd5c;
    }
    .header_menu {
        padding-right: 60px;
        padding-top: 10px;
        float: right;
        color: #fff;
        font-size: 8px;
    }
</style>