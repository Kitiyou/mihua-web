<template>
  <div class="mywords-container">
    <div class="mywords-header">
      <h2>我的话语</h2>
    </div>
    <div class="words-list">
      <el-card @click.native="handleAdd" class="add-words-card">
        <span class="add-words"><i class="el-icon-plus"></i>添加新话语</span>
      </el-card>
      <el-card v-for="words in wordsList" :key="words._id" class="words-card" :body-style="{ padding: '8px' }">
        <div class="words-card-header">
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(words._id)">
            <i slot="reference" class="el-icon-close delete-button"></i>
          </el-popconfirm>
          <i class="el-icon-share share-button" @click="handleShare(words._id)"></i>
          <i class="el-icon-edit edit-button" @click="handleEdit(words)"></i>
          <h3 class="words-title">{{ words.title }}</h3>
        </div>
        <div class="words-content">{{ words.content }}</div>
        <div class="words-time">公开时间：{{ words.publishTime | fmtDateTime }}</div>
      </el-card>
    </div>
    <words-dialog
      :visible.sync="editDialogVisible"
      :form-data="editFormData"
      @confirm="handleWordsConfirm"
      :width="'max(300px, 50%)'"
      :title="editDialogTitle"
    />
    <share-dialog :visible.sync="shareDialogVisible" :share-id="shareId"/>
  </div>
</template>

<script>
import * as wordsApi from '../../api/words'
import { formatDateTime } from '../../utils/date'
import WordsDialog from '../../components/mywords/WordsDialog'
import ShareDialog from '../../components/mywords/ShareDialog'

function defaultEditFormData() {
  return {
    title: '',
    publishTime: null,
    content: ''
  }
}

export default {
  components: { WordsDialog, ShareDialog },
  data() {
    return {
      wordsList: [],
      editDialogVisible: false,
      editDialogTitle: '',
      editingWordsId: null,
      editFormData: defaultEditFormData(),
      shareDialogVisible: false,
      shareId: 0
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        const res = await wordsApi.getMyWords();
        const resData = res.data;
        if (resData.code == 0) {
          this.wordsList = resData.data;
        }
        else {
          throw new Error(resData.msg);
        }
      }
      catch (err) {
        this.$message.error(err.message);
      }
    },
    handleAdd() {
      this.editDialogVisible = true;
      this.editDialogTitle = '添加话语';
      this.editingWordsId = null;
      this.editFormData = defaultEditFormData();
    },
    handleEdit(words) {
      this.editDialogVisible = true;
      this.editDialogTitle = '编辑话语';
      this.editingWordsId = words._id;
      this.editFormData.title = words.title;
      this.editFormData.publishTime = words.publishTime;
      this.editFormData.content = words.content;
    },
    async handleWordsConfirm() {
      try {
        if (this.editingWordsId) { //提交编辑话语
          const res = await wordsApi.updateWords(this.editingWordsId, this.editFormData);
          const resData = res.data;
          if (resData.code == 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            });
            this.editDialogVisible = false;
            this.getList();
          }
          else {
            throw new Error(resData.msg);
          }
        }
        else { //提交添加话语
          const res = await wordsApi.addWords(this.editFormData);
          const resData = res.data;
          if (resData.code == 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.editDialogVisible = false;
            this.getList();
          }
          else {
            throw new Error(resData.msg);
          }
        }
      }
      catch (err) {
        this.$message.error(err.message);
      }
    },
    async handleDelete(wordsId) {
      try {
        const res = await wordsApi.deleteWords(wordsId);
        const resData = res.data;
        if (resData.code == 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
        }
        else {
          if (err.response && err.response.status == 404 && err.response.data)
            this.$message.error(err.response.data.msg);
          else
            this.$message.error(err.message);
        }
      }
      catch (err) {
        this.$message.error(err.message);
      }
    },
    handleShare(wordsId) {
      this.shareDialogVisible = true;
      this.shareId = wordsId;
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
.mywords-container {
  max-width: 1024px;
  margin: 0 auto;
}
.mywords-header {
  color: white;
  border-bottom: 1px solid white;
}
.mywords-header h2{
  margin-top: 6px;
}
.words-list {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 8px;
}
.words-title {
  margin: 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.words-content {
  margin: 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2em;
  height: 2.4em;
}
.words-time {
  font-size: 13px;
  color: #888;
}
.words-card-header i {
  margin-left: 4px;
}
.edit-button {
  float: right;
  cursor: pointer;
  color: #3b6edd;
}
.share-button {
  float: right;
  cursor: pointer;
  color: #3b6edd;
}
.delete-button {
  float: right;
  cursor: pointer;
  color: #df3232;
}
.add-words-card {
  cursor: pointer;
  position: relative;
}
.add-words {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #606266;
}
</style>
