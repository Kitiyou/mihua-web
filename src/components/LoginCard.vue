<template>
  <el-card class="login-card">
    <div slot="header" class="card-header">
      <el-link @click="$router.push('/')" :underline="false" class="back-link">
        <i class="el-icon-back"></i>
      </el-link>
      <logo-title/>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
import LogoTitle from "./LogoTitle";

export default {
  components: { LogoTitle },
};
</script>

<style scoped>
.back-link {
  font-size: 30px;
  position: absolute;
  left: 20px;
  line-height: 40px;
}
.login-card {
  position: absolute;
  width: 310px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-header {
  text-align: center;
  height: 40px;
}
</style>