<template>
  <login-card>
    <el-form :model="formData" :rules="rules" label-width="72px" ref="registerForm" @submit.native.prevent>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" ref="usernameInput"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        @click="handleLogIn"
        :loading="loading"
        class="login-button"
      >登录</el-button>
    </el-form>
    <div class="register-link">
      尚未注册？
      <el-link @click="$router.push('/register')">点击注册</el-link>
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
        password: '',
        nickname: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
      loading: false
    };
  },
  methods: {
    handleLogIn() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch('user/LogIn', this.formData);
            this.$router.push({path: '/'});
          }
          catch(err) {
            this.$message.error('登录失败：' + err.message);
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
.login-button {
  display: block;
  width: 120px;
  margin: 0 auto;
}
.register-link {
  font-size: 14px;
  text-align: center;
  margin-top: 12px;
}
.el-link {
  vertical-align: baseline;
}
</style>
