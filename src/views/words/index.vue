<template>
  <div class="words-container">
    <div class="words-show" v-if="wordsData && wordsData.published">
      <div class="words-header">
        <h2 class="words-title">{{ wordsData.words.title }}</h2>
        <div class="words-creator-name">{{ wordsData.words.creatorName }}</div>
        <div class="words-publish-time">公开时间：{{ wordsData.words.publishTime | fmtDateTime }}</div>
      </div>
      <div class="words-content">{{ wordsData.words.content }}</div>
    </div>
    <div class="words-wait-container" v-else>
      <countdown v-if="wordsData && !wordsData.published" :delay="wordsData.delay" @timerEnd="getWords"/>
      <el-button plain @click="$router.push('/')">返回</el-button>
    </div>
  </div>
</template>

<script>
import * as wordsApi from '../../api/words'
import { formatDateTime } from '../../utils/date'
import Countdown from '../../components/Countdown'

export default {
  components: { Countdown },
  data() {
    return {
      wordsData: null
    }
  },
  created() {
    if (this.$store.state.words.wordsData) {
      this.wordsData = this.$store.state.words.wordsData;
      this.$store.dispatch('words/DeleteWordsData');
    }
    else
      this.getWords();
  },
  methods: {
    async getWords() {
      try {
        let wordsId = this.$route.params.id;
        const res = await wordsApi.getWords(wordsId);
        const resData = res.data;
        if (resData.code == 0) {
          this.wordsData = resData.data;
        }
        else {
          throw new Error(resData.msg);
        }
      }
      catch (err) {
        if (err.response && err.response.status == 404 && err.response.data)
          this.$message.error(err.response.data.msg);
        else
          this.$message.error(err.message);
      }
    }
  },
  filters: {
    fmtDateTime(time) {
      return time ? formatDateTime(time) : '';
    }
  }
}
</script>

<style scoped>
.words-container {
  height: 100%;
  width: 100%;
  position: relative;
}
.words-wait-container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  color: white;
}
.words-show {
  max-width: 1024px;
  margin: 0 auto;
  color: white
}
.words-header {
  border-bottom: 1px solid white;
}
.words-title {
  text-align: center;
  margin: 0 0 10px 0;
}
.words-creator-name {
  text-align: center;
}
.words-publish-time {
  font-size: 13px;
}
.words-content {
  padding: 8px;
}
</style>