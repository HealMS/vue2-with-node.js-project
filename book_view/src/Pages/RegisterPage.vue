<template>
    <div>
        <div class="box"><label for="">输入用户名: </label><input v-model="username" type="text" placeholder="用户名"></div>
        <div class="box"><label for="">输入密码: </label><input v-model="password" type="password" placeholder="密码"></div>
        <div class="box"><label for="">重复输入密码: </label><input v-model="rePassword" type="password" placeholder="密码"></div>
        <div class="box"><label for="">输入邮箱: </label><input v-model="userMail" type="text" placeholder="邮箱"></div>   
        <div class="box"><label for="">输入手机: </label><input v-model="userPhone" type="text" placeholder="手机"></div>
        <div class="box"><button @click="userRegister">注册</button></div>
    </div>
</template>
<script>
    import axios from "axios"

    export default {
        data() {
            return {
                username: "",
                password: "",
                rePassword: "",
                userMail: "",
                userPhone: "",
            }
        },
        methods: {
            userRegister(event) {
                if(this.password !== this.rePassword) {
                    alert("两次密码不一致")
                    return 0;
                }
                let registerUser = {
                    username: this.username,
                    password: this.password,
                    userMail: this.userMail,
                    userPhone: this.userPhone,
                }
                axios.post("http://localhost:3000/users/register", registerUser)
                    .then(res => {
                        if(res.data.status === 0) {
                            alert(res.data.message)
                            this.$router.go(-1)
                        } else {
                            alert(res.data.message)
                            // this.$router.go(0)
                        }
                    }).catch(err => alert(err))
            }
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