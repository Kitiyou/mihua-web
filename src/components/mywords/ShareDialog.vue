<template>
  <el-dialog :visible="visible" v-on:update:visible="$emit('update:visible', $event)" :width="'max(300px, 50%)'" title="分享话语">
    <div class="share-id">话语号：{{ shareId }}</div>
    <el-input placeholder="请输入内容" :value="shareLink" readonly>
      <el-button slot="append" icon="el-icon-document-copy" @click="copyLink"></el-button>
    </el-input>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible', 'shareId'],
  computed: {
    shareLink() {
      let origin = window.location.origin;
      return `${origin}/words/${this.shareId}`;
    }
  },
  methods: {
    copyLink() {
      this.$copyText(this.shareLink)
        .then(() => {
          this.$message({
            message: '复制退出',
            type: 'success'
          });
        }).catch(err => {
          this.$message.error('复制失败：' + err.message);
        });
    }
  }
}
</script>

<style scoped>
.share-id {
  margin-bottom: 10px;
}
</style>