<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  mounted(){
    window.addEventListener('hashchange',()=>{
      var currentPath = window.location.hash.slice(1); // 获取输入的路由
      if(this.$router.path !== currentPath){
        this.$router.push(currentPath); // 动态跳转
      }
    },false);
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
a{
  text-decoration: none;
  color: black;
}
a:active,.el-radio__input.is-checked+.el-radio__label{
  color: #002FA7;
}
.el-button--primary,.el-radio__input.is-checked .el-radio__inner{
  background-color: #002FA7;
  border-color:#002FA7;
}
.el-button--primary:hover{
  background-color:#002fa7bb
}
.el-input__inner:focus {
  border-color: #002fa7bb;
}
.el-tabs__item.is-active{
  color:#002FA7!important;
}
.el-tabs__item:hover{
  color: #002FA7!important;
}
.home{
  height: -webkit-fill-available;
  display: flex;
}
.el-tabs__header{
  margin: 0;
}
.el-tabs__item{
  font-size: 16px!important;
  margin: 5px 0;
}
</style>
