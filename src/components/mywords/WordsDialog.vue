<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible="dialogVisible">
    <el-form :model="formData" :rules="formRules" ref="editForm" @submit.native.prevent>
      <el-form-item prop="title">
        <div>标题</div>
        <el-input v-model="formData.title" class="title-input" maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item prop="publishTime">
        <div>公开时间</div>
        <el-date-picker v-model="formData.publishTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item prop="content">
        <div>话语内容</div>
        <el-input
          class="form-textarea"
          v-model="formData.content"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          maxlength="1000"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['visible', 'formData'],
  data() {
    return {
      formRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        publishTime: [
          { required: true, message: '请选择公开时间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入话语内容', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    dialogVisible: {
      set(value) {
        this.$emit('update:visible', value);
      },
      get() {
        return this.visible;
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$emit('confirm');
        }
      });
    }
  }
}
</script>

<style scoped>
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