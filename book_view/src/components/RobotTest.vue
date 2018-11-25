<template>
    <div id="">
        <p>
            <input type="text" v-model="question" />
        </p>
        <p>
            {{answer}}
        </p>
    </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      question: "",
      answer: "你还没有问人家问题呀~嘤嘤嘤"
    };
  },
  watch: {
    question() {
      if (this.question === "") {
        this.answer = "你还没有问人家问题呀~嘤嘤嘤";
      } else {
        this.answer = "等候发问~";
        this.getAnswer();
      }
    }
  },
  methods: {
    getAnswer() {
      if (this.question.indexOf("?") === this.question.length - 1) {
        this.answer = "思考中......";
        let that = this;
        axios
          .post("http://robottest.uneedzf.com/api/talk2Robot", {
            token: "d1c5e6f2dc176c5a6b95c870b0d4fb3a",
            message: that.question
          })
          .then(function(res) {
            if (res.data.code === 0) {
              that.answer = res.data.data;
            } else {
              that.message = res.data.message;
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        this.answer = "一个问题一般由一个 ? 结尾哦";
      }
    }
  }
};
</script>