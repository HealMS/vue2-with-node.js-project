/* 
    找回密码
    默认隐藏 repassword 和 updatepassword
 */
<template>
    <div>
        <div v-show="showUserInfo">
            <div class="box"><label for="">输入用户名: </label><input v-model="username" type="text" placeholder="用户名"></div>
            <div class="box"><label for="">输入邮箱: </label><input v-model="userMail" type="text" placeholder="邮箱"></div>
            <div class="box"><label for="">输入手机: </label><input v-model="userPhone" type="text" placeholder="手机"></div>
            <div class="box"><button @click="checkUser">找回密码</button></div>
        </div>
        <div v-show="showRePassword">
            <div class="box"><label for="">输入新密码: </label><input v-model="rePassword" type="text" placeholder="输入新密码"></div>
            <div class="box"><button @click="changeUserPassword">修改密码</button></div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"

    export default {
        data() {
            return {
                username: "",
                userMail: "",
                userPhone: "",
                showUserInfo: true,
                showRePassword: false,
                rePassword: "",
                data: {}
            }
        },
        methods: {
            checkUser(event) {
                axios.post("http://localhost:3000/users/findPassword", 
                {username: this.username, userMail: this.userMail, userPhone: this.userPhone})
                    .then(res => {
                        if(res.data.status === 0) {
                            this.showUserInfo = false
                            this.showRePassword = true
                            this.data = res.data.data
                        }
                    }).catch(err => alert(err))
            },
            changeUserPassword(event) {
                let params = Object.assign(this.data, {repassword: this.rePassword})
                axios.post("http://localhost:3000/users/findPassword", params)
                    .then(res => {
                        if(res.data.status === 0) {
                            alert(res.data.message)
                            this.$router.go(-1)
                        } else {
                            alert(res.data.message)
                        }
                    }).catch(err => alert(err))
            },
        }
    }
</script>
<style lang="css" scoped>
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }
</style>