<template>
  <login-card>
    <el-form :model="formData" :rules="rules" label-width="72px" ref="registerForm" @submit.native.prevent>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" ref="usernameInput"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        @click="handleRegister"
        :loading="loading"
        class="register-button"
      >注册</el-button>
    </el-form>
    <div class="login-link">
      已有用户？
      <el-link @click="$router.push('/login')">点击登录</el-link>
    </div>
  </login-card>
</template>

<script>
import LoginCard from '../../components/LoginCard'

export default {
  components: { LoginCard },
  data() {
    return {
      formData: {
        username: '',
        password: '',
        nickname: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '必须由 6 - 12 位的数字、字母组成', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '必须由 6 - 12 位的数字、字母组成', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
        ],
      },
      loading: false
    };
  },
  methods: {
    async handleRegister() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch('user/Register', this.formData)
            this.$router.push({path: '/'})
          }
          catch(err) {
            this.$message.error('注册失败：' + err.message);
          }
          finally {
            this.loading = false;
          }
        }
      });
    }
  },
  mounted() {
    this.$refs.usernameInput.focus();
  }
};
</script>

<style scoped>
.register-button {
  display: block;
  width: 120px;
  margin: 0 auto;
}
.login-link {
  font-size: 14px;
  text-align: center;
  margin-top: 12px;
}
.el-link {
  vertical-align: baseline;
}
</style>
