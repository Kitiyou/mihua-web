<template>
  <div class="index-container">
    <div class="index-center-container">
      <h1 class="mihua-title" :style="{ top: showInputFlag ? '30px' : '0px' }">秘话</h1>
      <transition name="fade">
        <div v-if="!showInputFlag">
          <div class="mihua-describe">把这份话语告诉未来的你/TA</div>
          <div class="index-buttons">
            <el-button plain @click="showInput">查看话语</el-button>
            <el-button plain @click="$router.push('/mywords')">我的话语</el-button>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="showInputFlag" class="input-close-container">
          <form class="input-container" @submit.prevent="handleWordsSubmit">
            <input type="text" class="words-id-input" placeholder="请输入话语号" v-model="wordsId">
            <button type="submit" class="right-button void-button"><i class="el-icon-right"></i></button>
          </form>
          <i class="el-icon-close close-button" @click="showInputFlag = false"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import * as wordsApi from '../../api/words'

export default {
  data() {
    return {
      showInputFlag: false,
      wordsId: ''
    };
  },
  methods: {
    async handleWordsSubmit() {
      try {
        if (!this.wordsId) {
          this.$message.error('请输入话语号');
          return;
        }
        const res = await wordsApi.getWords(this.wordsId);
        const resData = res.data;
        if (resData.code == 0) {
          this.$store.dispatch('words/PushWordsData', resData.data);
          this.$router.push(`words/${this.wordsId}`)
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
    },
    showInput() {
      this.wordsId = '';
      this.showInputFlag = true;
    }
  }
}
</script>

<style scoped>
.index-container {
  height: 100%;
  width: 100%;
  position: relative;
}
.index-center-container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  height: 120px;
  width: 300px;
  padding-top: 80px;
}
.mihua-title {
  font-size: 48px;
  font-weight: normal;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0;
  transition: 1s;
}
.mihua-describe {
  position: relative;
  width: 300px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  padding: 20px 0;
}
.mihua-describe::before {
  content: '';
  display: block;
  position: absolute;
  top: -24px;
  left: 50%;
  width: 1px;
  height: 24px;
  background: white;
}
.index-buttons {
  margin-top: 20px;
}
.input-close-container {
  position: absolute;
  top: 86px;
  left: 50%;
  transform: translateX(-50%);
}
.input-container {
  margin: 12px 0;
  position: relative;
}
.right-button {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  font-size: 32px;
  line-height: 100%;
  color: white;
}
.void-button {
  cursor: pointer;
  border: none;
  background-color: transparent;
  outline: none;
}
::placeholder {
  color: white;
  opacity: 1; /* Firefox */
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
}
.close-button {
  font-size: 32px;
  cursor: pointer;
}
.words-id-input {
  width: 260px;
  height: 40px;
  padding: 0;
  border: 2px solid white;
  background: none;
  outline: none;
  color: white;
  border-radius: 100px;
  font-size: 15px;
  text-align: center;
  /* animation: show 2s 1s both; */
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity 1.5s;
}
.fade-leave-to{
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 1.5s;
}
</style>