<template>
    <div>
        <label for="">数字1:</label>
        <input v-model="int1" type="text" />
        <br>
        <label for="">数字2:</label>
        <input v-model="int2" type="text" />
        <br>
        <label for="">展示Javascript表达式， 您输入的数字和为</label>
        {{parseInt(int1) + parseInt(int2)}}
    </div>
</template>
<script>
export default {
  data() {
    return {
      int1: 0,
      int2: 0
    };
  }
};
</script>