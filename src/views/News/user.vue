<template>
    <div>
        <el-container style="height: 100vh">
            <el-header style="padding: 0px !important;">
                <Header :info="info" />
            </el-header>
        <div class="profile" v-if="!isChange">
        <div class="img">
            <img :src="profile.avatar" alt="" width="150px" height="150px">
        </div>
        <div class="information">
            <el-descriptions title="" :column="1" >
            <el-descriptions-item label="用户名">{{ profile.username }}</el-descriptions-item>
            <!-- <el-descriptions-item label="账号">{{ profile.account }}</el-descriptions-item> -->
            <!-- <el-descriptions-item label="绑定邮箱">{{ profile.email }}</el-descriptions-item> -->
            <el-descriptions-item label="性别">{{ profile.sex?'男':'女' }}</el-descriptions-item>
            <el-descriptions-item label="关注">{{ profile.focusNum }}</el-descriptions-item>
            <el-descriptions-item label="粉丝">
                <el-tag size="small">{{ profile.fansNum }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="所在地区">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="个人简介">{{ profile.introduce }}</el-descriptions-item>
            </el-descriptions>
        </div>
        
        </div>
        <div class="profile" v-else>
        <div class="img">
            <!-- <img :src="profile.avatar" alt=""> -->
                    <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
            <el-upload
            class="avatar-uploader"
            action="/api/upload/image"
            :headers="uploadHeader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="changeProfile.avatar" :src="changeProfile.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="information">
            <el-descriptions title="个人信息" :column="1" >
            <el-descriptions-item label="用户名"><el-input style="width: 450px;" v-model="changeProfile.username"></el-input></el-descriptions-item>
            <el-descriptions-item label="账号">{{ profile.account }}</el-descriptions-item>
            <el-descriptions-item label="性别">
                <el-radio-group v-model="changeProfile.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
                </el-radio-group>
            </el-descriptions-item>
            <el-descriptions-item label="关注">{{ profile.focusNum }}
            </el-descriptions-item>
            <el-descriptions-item label="粉丝数">
                <el-tag size="small">{{ profile.fansNum }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="个人简介">
                <el-input type="textarea" v-model="changeProfile.introduce"></el-input>
            </el-descriptions-item>
            </el-descriptions>
        </div>
        
        </div>
    </el-container>

    </div>
  
  
  </template>
  
  <script>
import Header from '../../components/container/Header.vue';
  export default {
  components:{ Header },
    name: 'Profile',
    data () {
      return {
        info: {
        title: '新闻浏览',
        back:false
      },
        userId:'',
        profile: {},
        isChange: false,
        changeProfile: {
          username: "", //用户名
          avatar: "", //头像
          sex: "", //性别
          introduce: "" //简介
        },
        uploadHeader: {
          'token': window.sessionStorage.getItem('token')
        }
      }
    },
    mounted() { 
      this.userId = this.$route.params.id
      this.getProfile();
    },
    methods: { 
      handleAvatarSuccess(res, file) {
        console.log(res);
        this.changeProfile.avatar="https://demo.xqstudy.top"+res.data
        },
      beforeAvatarUpload(file) {
          console.log(file);
          // const isJPG = file.type === 'image/jpeg';
          const isLt5M = file.size / 1024 / 1024 < 5;
  
          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 5MB!');
          }
          return isLt5M;
        },
      changeInfo() { 
        this.isChange = true;
      },
      cancel() { 
        this.isChange = false;
      },
      getProfile() { 
        this.axios.get("/api/user/info?userId="+this.userId).then(res => { 
          this.profile = res.data.data;
          console.log(res);
        }).catch(err => { 
          console.log(err);
        })
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .el-container{
  }
  .profile {
    box-sizing: border-box;
  }
  .img {
    width: 100%;
    margin: 60px 0;
  }
  .profile .information {
    margin-left: 100px;
  }

  
  /* .avatar-uploader {
    border: 1px solid grey;
  } */
  .avatar-uploader {
      border: 1px dashed #d9d9d9 !important;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  .avatar-uploader:hover {
      border-color: #409EFF !important;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  </style>
  