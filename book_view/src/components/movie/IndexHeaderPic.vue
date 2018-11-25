<template>
    <div class="headerPic">
        <div>
            <p class="imgTitle">{{recommendTitle}}</p>
            <a href="www.baidu.com">
                <img src="../../assets/shebao.jpg" class="headerImg" />
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                recommendTitle: ''
            }
        }
    }
</script>
<style lang="css" scoped>
    .headerPic {
        height: 300px;
        width: 100%;
        background-color: antiquewhite;
    }
    .headerImg {
        height: 300px;
        width: 100%;
    }
    .imgTitle {
        z-index: 2;
        padding-left: 45%;
        padding-top: 230px;
        position: absolute;
        color: #fff;
        font-size: 20px;
    }
</style>