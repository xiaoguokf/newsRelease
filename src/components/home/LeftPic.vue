<template>
  <div class="left">
    <div class="login-container"></div>
  </div>
</template>

<script>
export default {
  name: 'LeftPic'
}
</script>

<style scoped>
.left{
  flex: 1;
}
.login-container {
    background:url('~@/assets/img/login.png') no-repeat center center;
    background-size: cover;
    height: 100%;
}
</style>
