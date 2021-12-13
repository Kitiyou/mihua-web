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
        <div>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(words._id)">
            <i slot="reference" class="el-icon-close delete-button"></i>
          </el-popconfirm>
          <i class="el-icon-share share-button" @click="handleShare(words._id)"></i>
          <h3 class="words-title">{{ words.title }}</h3>
        </div>
        <div class="words-content">{{ words.content }}</div>
        <div class="words-time">公开时间：{{ words.publishTime | fmtDateTime }}</div>
      </el-card>
    </div>
    <el-dialog :visible.sync="addDialogVisible" :width="'max(300px, 50%)'" title="添加话语">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" @submit.native.prevent>
        <el-form-item prop="title">
          <div>标题</div>
          <el-input v-model="addForm.title" class="title-input" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item prop="publishTime">
          <div>公开时间</div>
          <el-date-picker v-model="addForm.publishTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item prop="content">
          <div>话语内容</div>
          <el-input
            class="form-textarea"
            v-model="addForm.content"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">添 加</el-button>
      </span>
    </el-dialog>
    <share-dialog :visible.sync="shareDialogVisible" :share-id="shareId"/>
  </div>
</template>

<script>
import * as wordsApi from '../../api/words'
import { formatDateTime } from '../../utils/date'
import ShareDialog from '../../components/mywords/ShareDialog'

function defaultAddForm() {
  return {
    title: '',
    publishTime: null,
    content: ''
  }
}

export default {
  components: { ShareDialog },
  data() {
    return {
      wordsList: [],
      addDialogVisible: false,
      addForm: defaultAddForm(),
      addFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择公开时间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入话语内容', trigger: 'blur' }
        ]
      },
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
      this.addDialogVisible = true;
      this.addForm = defaultAddForm();
    },
    handleAddConfirm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          try {
            const res = await wordsApi.addWords(this.addForm);
            const resData = res.data;
            if (resData.code == 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.addDialogVisible = false;
              this.getList();
            }
            else {
              throw new Error(resData.msg);
            }
          }
          catch (err) {
            this.$message.error(err.message);
          }
        }
      });
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
.share-button {
  float: right;
  cursor: pointer;
  color: #3b6edd;
  margin-right: 4px;
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
.title-input {
  width: 220px;
}
.el-form-item {
  margin-bottom: 12px;
}
.form-textarea {
  line-height: 12px;
}
</style>
