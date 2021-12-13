<template>
  <div>
    <div class="countdown-title">距离公开还剩</div>
    <div class="countdown-time">{{ remainingTimeFmt }}</div>
  </div>
</template>

<script>
import { formatRemainingTime } from '../utils/date'

export default {
  props: ['delay'], //倒计时剩余时间
  data() {
    return {
      endTime: 0, //倒计时结束时间戳，秒单位
      remainingTime: 0, //剩余时间，秒单位
      timerId: 0
    };
  },
  computed: {
    remainingTimeFmt() {
      return formatRemainingTime(this.remainingTime);
    }
  },
  created() {
    //设置倒计时定时器
    const now = new Date()
    this.endTime = Math.ceil((this.delay + (+now)) / 1000);
    this.updateTimer();
    setTimeout(() => {
      this.updateTimer();
      this.timerId = setInterval(() => { //每秒调用
        this.updateTimer();
        if (this.remainingTime <= 0) {
          clearInterval(this.timerId);
          this.$emit('timerEnd');
        }
      }, 1000);
    }, 1000 - now.getTime() % 1000) //保证毫秒位为大于等于000且接近000时回调
  },
  beforeDestroy() {
    clearInterval(this.timerId);
  },
  methods: {
    updateTimer() {
      this.remainingTime = this.endTime - Math.floor(+new Date() / 1000);
    }
  }
}
</script>

<style scoped>
.countdown-title {
  font-size: 20px;
}
.countdown-time {
  font-size: 36px;
  margin: 12px 0;
}
</style>