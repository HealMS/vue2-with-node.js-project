<template>
    <label for="">直接输出的模式：</label>
    <div>{{message}}</div>
    <label for="">解析后输出的模式：</label>    
    <div v-html="message"></div>
</template>
<script>
    export default {
        data() {
            return {
                message: "<div style='font-size: 30px; color: red;'>HelloWorld</div>"
            }
        }
    }
</script>