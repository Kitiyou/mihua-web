<template>
  <el-header>
    <logo-title/>
    <div class="user-info">
      <template v-if="loggedIn">
        您好，{{ nickname }}
        <el-link @click="handleLogOut">退出登录</el-link>
      </template>
      <template v-else>
        您好，请
        <el-link @click="$router.push('/login')">登录</el-link>
        /
        <el-link @click="$router.push('/register')">注册</el-link>
      </template>
    </div>
  </el-header>
</template>

<script>
import { mapState } from 'vuex';
import LogoTitle from '../../components/LogoTitle'

export default {
  components: { LogoTitle },
  computed: {
    ...mapState('user', ['loggedIn', 'nickname'])
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch('user/LogOut');
      if (this.$route.meta.needLogIn)
        this.$router.push({path: '/'});
      this.$message({
        message: '成功退出',
        type: 'success'
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #c390e0;
  border-bottom: 1px solid white;
  color: #333;
  position: relative;
}
.el-link {
  vertical-align: baseline;
}
.user-info {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 14px;
}
.logo-title {
  margin: 10px 0;
}
</style>