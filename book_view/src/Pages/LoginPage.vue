<template>
    <div>
        <div class="box">
            <label for="">输入用户名:</label>
            <input v-model="username" placeholder="用户名">
        </div>
        <div class="box">
            <label for="">密码:</label>
            <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="box">
            <button @click="userLogin">登录</button>
            <button style="margin-left: 10px;" @click="userRegister">注册</button>
            <button style="margin-left: 10px;" @click="forgetPassword">忘记密码</button>
        </div>
    </div>
</template>
<script>
    import axios from  "axios"

    export default {
        data() {
            return {
                username: "",
                password: "",
            }
        },
        methods: {
            userLogin() {
                axios.post("http://localhost:3000/users/login", 
                {username: this.username, password: this.password})
                    .then(res => {
                        if(res.data.status === 0) {
                            localStorage.setItem("token", res.data.data.token)
                            localStorage.setItem("username", res.data.data.user[0].username)
                            localStorage.setItem("_id", res.data.data.user[0]._id)
                        } else {
                            alert(res.data.message)
                        }
                        this.$router.go(-1)  //回退一步到主页面
                    }).catch(err => alert(err))
            },
            userRegister() {
                this.$router.push({path: "/registerPage"})
            },
            forgetPassword() {
                this.$router.push({path: "/findPassword"})
            },
        }
    }
</script>
<style lang="css" scoped>
    .box {
        display: flex;
        justify-content: center;
        align-content: center;
        padding-top: 10px;
    }
</style>