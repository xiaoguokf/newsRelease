<template>
  <div class="home">
    <Left-pic />
    <Login />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftPic from '../components/home/LeftPic.vue'
import Login from '../components/home/Login.vue'

export default {
  components: {
    LeftPic,
    Login
  }
}

</script>

<style scoped>
.home{
  height: -webkit-fill-available;
  display: flex;
}
</style>
