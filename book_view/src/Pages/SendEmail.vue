<template>
    <div class="container">
        <movie-index-header></movie-index-header>
        <div class="userMessage">
            <user-message></user-message>
        </div>
        <div class="box">
            <label for="">收件箱</label>
            <email-list></email-list>
        </div>
        <div class="box">
            <label for="">发件箱</label>
            <email-list></email-list>
        </div>
        <send-talk-box></send-talk-box>
        <common-footer></common-footer>
    </div>
</template>
<script>
    import MovieIndexHeader from "../components/movie/MovieIndexHeader"
    import UserMessage from "../components/movie/UserMessage"
    import EmailList from "../Pages/EmialList"
    import SendTalkBox from "../Pages/SendTalkBox"
    import CommonFooter from "../components/movie/CommonFooter"
    
    export default {
        components: {
            MovieIndexHeader,
            UserMessage,
            EmailList,
            SendTalkBox,
            CommonFooter,
        }
    }
</script>
<style lang="css" scoped>
    .container {
        width: 100%;
        margin: 0 auto;
    }
    .box {
        display: inline-flex;
    }
</style>