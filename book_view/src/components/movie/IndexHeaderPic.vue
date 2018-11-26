<template>
    <div class="headerPic">
        <div>
            <p class="imgTitle">{{recommendTitle}}</p>
            <a :href="recommendSrc">
                <img :src="recommendImg" class="headerImg" />
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["recommendTitle", "recommendSrc", "recommendImg"],
        data() {
            return {
                
            }
        }
    }
</script>
<style lang="css" scoped>
    .headerPic {
        height: 500px;
        width: 100%;
        background-color: antiquewhite;
    }
    .headerImg {
        height: 500px;
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