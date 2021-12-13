<template>
  <div class="logo-title">
    <router-link to="/">
      <img src="/img/mihua-icon.png" alt="Logo" class="mihua-icon">
      <h1 class="mihua-title">秘话</h1>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.logo-title {
  display: inline-block;
}
.mihua-icon {
  vertical-align: middle;
  width: 40px;
  height: 40px;
}
.mihua-title {
  vertical-align: middle;
  font-size: 24px;
  margin: 0 0 0 8px;
  display: inline-block;
  color: #424346;
  font-weight: normal;
}
</style>