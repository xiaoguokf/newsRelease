<template>
    <el-header class="vertical">
      <img class="logo" src="../../assets/img/logo.png" >
      <span class="title">{{info.title}}</span>

      <div class="backToIndex" @click="comeTo('/')" v-if="info.back">
        <i class="el-icon-arrow-left"></i>
        <span>返回首页</span>
      </div>  

      <div class="search">
        <el-select v-model="value" placeholder="搜索" class="searchOp">
          <el-option 
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="searchInfo" placeholder="请输入搜索内容" class="searchIn"></el-input>
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>

      <el-button type="info" v-if="login" class="loginBut" @click="comeTo('/login')">登录</el-button>
      <div class="user vertical" @click="comeTo('/personal/draft')" v-else>
        <i class="el-icon-bell"></i>
        <el-avatar v-bind:src="avatar"></el-avatar>
        <span>{{name}}</span>
      </div>
    </el-header>
</template>

<script>
export default {
  name: 'Header',
  props:["info"],
  data () {
    return {
      login:true,
      searchInfo:'',
      avatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      name:"jay.liu",
      searchOptions: [{
          value: '选项1',
          label: '新闻'
        }, {
          value: '选项2',
          label: '用户'
        }],
        value: '新闻'
    }
  },
  mounted(){
    let token = sessionStorage.getItem('token')
    let that = this
    if(token!=null){
      this.axios({
        method:'get',
        url:'/api/user/info',
        header:{
          "token":this.token
        },
      }).then(function(response) {
        // console.log(response)
        let data = response.data.data
        if(response.data.code===200){
          that.login=false
          if(data.avatar!=null) that.avatar = data.avatar
          that.name = data.nickName
        }else{
          if(response.data.code==3001) response.data.msg='请重新登录'
          that.$message({
            message: response.data.msg,
            type: 'warning'
          });
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
        that.$message({
          message: error,
          type: 'error'
        });
      });
    }
  },
  methods: {
    back() { 
      // this.$router.back() 
      this.$router.push('/')
    },
    comeTo(pos){
      this.$router.push(pos)
      if(this.$route.path.includes("/search")) location.reload() 
    },
    search(){
      if(this.value=='新闻') this.comeTo('/search/news/'+this.searchInfo)
      else this.comeTo('/search/user/'+this.searchInfo)
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
    height: 64px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 1px rgba(0,21,41,0.12);
    opacity: 1;
    
   
  }

.vertical {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.user {
  position: absolute;
  right: 35px;
}
.user:hover{
  cursor: pointer;
}
.user .el-avatar {
  margin:0px 10px;
}
.user i {
  margin-right:20px;
}
  .el-header .title {
    margin-right: 30px;
    font-size: 22px;
    font-family: Microsoft YaHei UI-Bold, Microsoft YaHei UI;
    font-weight: bold;
    color: #002FA7;
    line-height: 22px;

  }
  .el-header .logo {
    display: inline-block;
    margin: 6px 24px;
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
  .backToIndex {
    margin-left: 70px;
    font-size: 16px;
    font-family: Segoe UI-Regular, Segoe UI;
    font-weight: 400;
    color: #001529;
    line-height: 0px;
    cursor: pointer;
  }
  .backToIndex:hover{
    color: #002FA7;
  }
  .loginBut{
    position: absolute;
    right: 50px;
  }
  .search{
    width: 400px;
    position: absolute;
    right: 300px;
    
  }
  .searchOp{
    width: 80px;
    float: left;
    z-index: 1;
  }
  .searchIn{
    width: 220px;
    float: left;
  }
  .search button{
    float: left;
  }
</style>
