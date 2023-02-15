<template>
  <div class="home">
    <Left-pic />
    <div class="loginInput">
        <el-form  status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm"
        :model="ruleForm"
        >
        <el-form-item label="">
            <i class="el-icon-user-solid" @click="test"></i>
            <el-input v-model="ruleForm.id" placeholder="账号名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
            <i class="el-icon-unlock"></i>
            <el-input
            v-model="ruleForm.pass" type="password" 
            placeholder="密码" autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
            <i class="el-icon-unlock"></i>
            <el-input
            v-model="ruleForm.checkPass" type="password" 
            placeholder="确认密码" autocomplete="off"
            ></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <i class="el-icon-message"></i>
            <el-input
            v-model="ruleForm.email"
            placeholder="邮箱"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <i class="el-icon-user"></i>
            <el-input
            v-model="ruleForm.nickName"
            placeholder="昵称"
            ></el-input>
        </el-form-item>
        <el-form-item v-loading="registerLoad">
            <el-button type="primary" @click="submitForm('ruleForm')" 
            >注册</el-button
            >
        </el-form-item>
        <el-form-item>
            <span><router-link to="/login"><span ref="back">&lt;&lt;</span>返回登录</router-link></span>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import LeftPic from './LeftPic.vue'
export default {
  components: {
    LeftPic
  },
  data () {
    var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          console.log(this.ruleForm.pass,value)
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        id: '',
        email: '',
        pass: '',
        checkPass: '',
        nickName:''
      },
      verCodeTime:0,
      registerLoad:false,
      jumpCount:3,
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
      },        
    }
  },
  methods: {
      submitForm(formName) {
        let that = this
        that.jumpCount=3
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.registerLoad=true
            this.axios({
              method:'post',
              url:'/api/user/register',
              data:{
                "username": this.ruleForm.id, //账户
                "password": this.ruleForm.pass, //密码
                "email": this.ruleForm.email,
                "nickName": this.ruleForm.nickName
              }
            }).then(function(response) {
              console.log(response)
              that.registerLoad=false
              if(response.data.code===200){
                let mess=that.$message({
                  message: '注册成功！请等待，即将为您跳转至登录页..',
                  type: 'success'
                });
                console.log(mess)
                that.timer = setInterval( () => {
                  console.log(that.jumpCount)
                  if(that.jumpCount!=1) that.jumpCount--
                  else {
                    that.$refs.back.click()
                    clearInterval(that.timer)
                    this.$router.push('/login')
                    // location.reload()
                  }
                }, 1000)
              }else{
                that.registerLoad=false
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
          } else {
            this.$message({
              message: '输入非法！',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      test(){
        console.log(this.$refs.back)
        // this.$router.go('/login')
        // this.$router.push('/personal')
        // this.$refs.back.click(function() {
        //   location.reload()
        // })
      }
  }
}
</script>

<style scoped>
.loginInput{
    flex: 1;
}
.loginInput form{
    width: 320px;
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translate(-15%,-50%);
}
.el-input input{
    border: none!important;
}
.el-button--primary{
    width: 100%;
}
.el-form-item__content i{
    position: absolute;
    top: 15px;
    left: -30px;
}
.el-form-item__content span{
    color: #002FA7;
}
form div:nth-child(6){
    margin: 0;
}
form div:nth-child(7) div span{
    float: left;
}
.verCode{
  cursor: pointer;
  position: absolute;
  width: fit-content;
  right: 20px;
  pointer-events: auto;
}
.verCodeAgain{
  color: gray!important;
  cursor: no-drop;
}
</style>
