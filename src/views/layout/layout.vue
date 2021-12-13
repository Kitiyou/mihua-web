<template>
  <el-container>
    <header-bar/>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import HeaderBar from './HeaderBar'

export default {
  components: {HeaderBar}
};
</script>

<style scoped>
.el-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: linear-gradient(#dd93cd, #d4b183);
}
.el-main {
  flex: 1;
}
</style>