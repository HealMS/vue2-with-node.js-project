<template>
    <div>
        <label for="">评论</label>
        <hr>
        <div>
            <li v-for="item in commentItems">
                <h3>{{item.username}}</h3>
                评论说:
                <p>{{item.context}}</p> 
            </li>
        </div>
        <div style="padding: 5px">
            <textarea v-model="context" style="width: 80%; height: 50px;" placeholder="内容">
            </textarea>
        </div>
        <div style="padding-top: 10px;">
            <button @click="send_comment">评论</button>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        props: ["movie_id"],
        data() {
            return {
                commentItems: [],
                context: '',
            }
        },
        created() {
            this.getAllComment()
        },
        methods: {
            send_comment(event) {
                let send_data = {}
                if(typeof(localStorage.username) !== undefined) {
                    send_data = {
                        username: localStorage.username,
                        movie_id: this.movie_id,
                        context: this.context,
                    }
                } else {
                    send_data = {
                        movie_id: this.movie_id,
                        context: this.context,
                    }
                }
                axios.post("http://localhost:3000/users/postComment", send_data)
                    .then(res => {
                        if(res.data.status === 0) {
                            alert(res.data.message)
                            this.getAllComment()
                        }
                    }).catch(err => alert(err))
            },
            getAllComment() {
            axios.post("http://localhost:3000/users/getAllComment", {movie_id: this.movie_id})
                .then(res => {
                    if(res.data.status === 0) {
                        this.commentItems = res.data.data
                    }
                }).catch(err => alert(err))
            },
        },
    }
</script>
<style lang="css" scoped>
    li {
        text-decoration: none;
        list-style-type: none;
    }
</style>