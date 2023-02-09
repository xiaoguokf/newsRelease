<template>
  <div class="home">
    <Left-pic />
    <div class="loginInput">
        <el-form  status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm"
        :model="ruleForm"
        >
        <el-form-item prop="email">
            <i class="el-icon-message"></i>
            <el-input
            v-model="ruleForm.email"
            placeholder="邮箱"
            ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleForm.emailvalue"></el-input>
          <span class="verCode" @click="getVerCode" v-if="verCodeTime==0">获取验证码</span>
          <span class="verCode verCodeAgain" v-else>重新发送({{verCodeTime}})</span>
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
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
            >找回密码</el-button
            >
        </el-form-item>
        <el-form-item>
            <span><router-link to="/">&lt;&lt;返回登录</router-link></span>
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
        message: '',
        pass: '',
        checkPass: '',
        email:'',
        emailvalue:''
      },
      verCodeTime:0,
      verCodeLoad:false,
      findLoad:false,
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
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getVerCode(){
        console.log(this.ruleForm.email)
        if(this.ruleForm.email!=''){
          this.axios({
            method:'post',
            url:'/api/user/sendEmail',
            data:{
              "email":this.ruleForm.email
            }
          }).then(function(response) {
            console.log(response)
          }).catch(function (error) { // 请求失败处理
            console.log(error);
          });
        }else{
          this.$message({
            message: '您还没有填写邮箱',
            type: 'error'
          });
        }

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
form div:nth-child(5){
    margin: 0;
}
form div:nth-child(4) div span{
    cursor: pointer;
}
form div:nth-child(6) div span{
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
