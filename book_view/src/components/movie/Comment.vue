<template>
    <div>
        <label for="">评论</label>
        <hr>
        <div>
            <li <!-- v-for="item in items" -->>
                XXX 评论说: XXX
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
    
</script>
<style lang="css" scoped>
    
</style>