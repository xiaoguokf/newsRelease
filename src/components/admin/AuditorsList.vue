<template>
  <div class="news">
    <div class="top">
      <span>
        共获取<span style="color: #f56c6c;">{{auditorsList.length}}</span>条审核员账号信息
      </span>

      <div>
        <el-button type="primary" icon="el-icon-plus" @click="addAuditor">
          新建审核员账号
        </el-button>
      </div>
    </div>
    <div class="auditorsList">
      <el-table
        :data="auditorsList"
        style="width: 100%"
        :header-cell-style="{background:'#E8EBEF'}"
        >
        <el-table-column
          label="审核员ID"
          width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.auditId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账号"
          width="350">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="密码"
          width="350">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pwd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">注销账号</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
    <!-- 新建账号弹框 -->
    <el-dialog title="新建审核员账号" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="accountForm"  :rules="rules" ref="accountForm" label-width="100px" class="demo-accountForm">
        <el-form-item label="账号" prop="account" >
          <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="accountForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('accountForm')">取 消</el-button>
        <el-button type="primary" @click="addAuditor('accountForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码弹框 -->
    <el-dialog title="修改审核员密码" :visible.sync="changeFormVisible" width="30%">
      <el-form :model="changeForm"  :rules="rules" ref="changeForm" label-width="100px" class="demo-accountForm">
        <el-form-item label="账号" prop="account" >
          <el-input type="text" v-model="changeForm.account" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="changeForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('changeForm')">取 消</el-button>
        <el-button type="primary" @click="changeAuditorPwd('changeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      input:'',
      auditorsList: [],
      dialogFormVisible: false,
      changeFormVisible:false,
      accountForm: {
        account:'',
          pwd: '',
      },
      changeForm: {
        account: '',
        pwd:''
      },
      rules: {
        account: [
            {  min: 8, max: 16, message: '账号必须为8-16位',required:true,trigger: 'blur'}
          ],
        pwd: [
          {min: 6, max: 16, message: '密码长度不小于6位，不大于16位',required:true, trigger: 'blur' }
        ],
      }
    }
  },
  mounted() { 
    this.getAuditorsList();
  },
  methods: {
    handleEdit(index, row) {
      this.changeForm.account = row.account;
      this.changeFormVisible = true;
      this.changeAuditorPwd('accountForm');
      },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteAuditor(row.id, row.account);
    },
    getAuditorsList() { 
      this.axios({
        method: "GET",
        url:"/api/admin/listAudit?current=2&size=1"
      }).then(res => { 
        console.log(res);
        this.auditorsList = res.data.data.records;
      }).catch(err => { 
        console.log(err);
      })
    },
    // 新建管理员账号
    addAuditor(formName) {
      this.dialogFormVisible = true;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
              method: "POST",
              url: "/api/admin/addAudit",
              data:this.accountForm
            }).then(res => { 
              console.log(res);
              this.$message({
                type:'success',
                message: "新建账号成功"
              }) 
            }).catch(err => { 
              console.log(err);
            })
          } else {
            this.$message({
                type:'error',
                message: "账号/密码不符合要求"
              });
            return false;
          }
      });
    },
    // 修改密码
    changeAuditorPwd(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios({
              method: "PUT",
              url: "/api/admin/changeAudit",
              data:this.changeForm
            }).then(res => { 
              if (res.data.msg==="ok") {
                this.$message({
                type:'success',
                message: "修改密码成功"
              }) 
              }
            }).catch(err => { 
              console.log(err);
            }),
          this.resetForm('accountForm');
          } else {
            this.$message({
                type:'error',
                message: "密码不符合要求"
              });
            return false;
          }
      });
    },
    // 注销审核员账号
    deleteAuditor(id,account) {
      this.axios({
        method: "DELETE",
        url: "/api/admin/delAudit?id=" + id,
        data: {
          account:account
        }
      }).then(res => { 
        console.log(res);
        if (res.data.msg === "ok") {
          this.$message({
            type: 'success',
            message: "注销账号成功"
          })
        }
      }).catch(err => { 
        console.log(err);
      })
    },
    // 重置弹框
    resetForm(formName) {
      if (formName=='accountForm') {
        this.changeFormVisible=false
      } else {
        this.dialogFormVisible=false
      }
        this.$refs[formName].resetFields();
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 10px 0;
  /* width: 80%; */
}
.auditorsList {
  margin: 0px auto;
}

  a{
    text-decoration: none;
    color: #ffff;
  }
</style>
