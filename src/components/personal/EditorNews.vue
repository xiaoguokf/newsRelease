<template>
  <div class="editorNews">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
  <el-form-item label="新闻标题" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
  <el-form-item label="新闻类型" prop="kind" >
    <el-select v-model="ruleForm.kind" placeholder="请选择新闻类型" :position="12" style="z-index: 100;">
      <el-option label="时政" value="0"></el-option>
      <el-option label="文教" value="1"></el-option>
      <el-option label="科技" value="2"></el-option>
      <el-option label="体育" value="3"></el-option>
      <el-option label="社会" value="4"></el-option>
      <el-option label="其他" value="5"></el-option>
      <!-- 0：时政 1：文教 2：科技 3：体育 4：社会 5：其他 ：所有 -->
    </el-select>
  </el-form-item>
  <el-form-item label="新闻标签" prop="label">
    <el-checkbox-group v-model="ruleForm.label">
      <el-checkbox label="经济" name="label"></el-checkbox>
      <el-checkbox label="能源" name="label"></el-checkbox>
      <el-checkbox label="科技" name="label"></el-checkbox>
      <el-checkbox label="生活" name="label"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="新闻内容" prop="content">
    <!-- <el-input type="textarea" v-model="ruleForm.content"></el-input> -->
  <editor ref="editorOne" v-model="ruleForm.content"  @change="change" ></editor>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="saveDraft('ruleForm',1)">保存为草稿</el-button>
    <el-button type="primary" @click="saveDraft('ruleForm',0)">发布新闻</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
  </template>
  
<script>
import Editor from './MyEditor.vue'

export default {
  components: { Editor},
  data() {
    return {
          detail: "",
          ruleForm: {
          title: '',
          kind: '',
          label: [],
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          kind: [
            { required: true, message: '请选择新闻类型', trigger: 'change' }
          ],
          label: [
            {required: true, message: '请至少选择一个新闻标签', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请输入新闻内容', trigger: 'blur' }
          ]
        }
      
          }
  },  
  mounted() {
    if (this.$route.query.newsId) {
      this.axios.get(
      "/api/news/articleDetail?newsId="+this.$route.query.newsId
    ).then(res => { 
      this.ruleForm = res.data.data;
      this.ruleForm.label=res.data.data.label.split(",")
      console.log(res);
    }).catch(err => { 
      console.log(err);
    })
    // console.log(this.ruleForm);
    } 
    
  },
  methods: {
    change(val) {
        console.log(val)
    },
    putDraft(id) { 
      this.axios({
        method: "PUT",
        url: '/api/news/releaseNews?newsId='+id,
      }).then(res => { 
          console.log(res);
        }).catch(err => { 
          console.log(err);
      })
    },
    saveDraft(formName,flag) {
      this.$refs[formName].validate((valid) => {
        this.ruleForm.label = this.ruleForm.label.toString();
          console.log(this.ruleForm);
        if (valid) {
            if (this.$route.query.newsId) {
              this.axios({
                method: "DELETE",
                url:"/api/news/DeleteNews?newsId="+this.ruleForm.newsId
              }).then(res => {
              }).catch(err => { 
                console.log(err);
              })
            }
            this.axios({
              method: "POST",
              url: "/api/news/addArticle",
              data:this.ruleForm
            }).then(res => { 
              console.log(res);
              if (!flag) {
                this.putDraft(res.data.data);
              }
              this.$message({
                type:'success',
                message: flag?'保存成功':'已提交发布审核，请注意查看审核结果...'
              });
            }).catch(err => { 
              console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
   }
}
</script>
<style scoped>
.demo-ruleForm {
  margin: 10px;
}
</style>

  