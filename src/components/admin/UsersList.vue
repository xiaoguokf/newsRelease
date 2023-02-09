<template>
  <div class="news">
    <div class="top">
      <span>
        共有<span style="color: #f56c6c;">{{usersList.length}}</span>位用户信息
      </span>
    </div>
    <div class="usersList">
      <el-table
        :data="usersList"
        style="width: 100%"
        :header-cell-style="{background:'#E8EBEF'}"
        >
        <el-table-column
          label="用户ID"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户账号"
          width="360">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="封禁状态"
          width="200">
          <template slot-scope="scope">
            <div slot="reference" class="title-wrapper">
                <el-tag size="medium" >{{ scope.row.focus?'已封禁':'正常' }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              plain
              @click="handleEdit(scope.$index, scope.row)">解封</el-button>
            <el-button
              size="mini"
              type="danger"
              plain
              @click="handleDelete(scope.$index, scope.row,false)">暂时封禁</el-button>
              <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,true)">永久封禁</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
    <el-dialog title="封禁时间(单位：天)" :visible.sync="dialogFormVisible" width="30%">
      <el-input-number v-model="duration" :min="1" :max="365" label="封禁天数"></el-input-number>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="bannedUser(banUserId,duration)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      input:'',
      usersList: [],
      dialogFormVisible: false,
      banUserId:'',
      duration:1
      }
  },
  mounted() { 
    this.getUsersList();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.bannedUser(row.userId, 0);
    },
    handleDelete(index, row, forever) {
      if (forever) {
        this.bannedUser(row.userId, -99);
      } else {
        this.dialogFormVisible = true,
          this.banUserId = row.userId;
      }
    },
    getUsersList() { 
      this.axios({
        method: "GET",
        url:"/api/search/user?content=gatta"
      }).then(res => { 
        console.log(res);
        this.usersList = res.data.data.records;
      }).catch(err => { 
        console.log(err);
      })
    },
    bannedUser(userId,duration) {
      this.axios({
        method: "POST",
        url: "/api/admin/bannedUser",
        data: {
          userId:userId,
          duration:duration,
          }
          }).then(res => {
            console.log(res);
            if (res.data.code=="200") {
              this.$message({
                type:'success',
                message: '操作成功'
              });
            }
            this.dialogFormVisible = false;
            this.getUsersList(); 
          }).catch(err => { 
            console.log(err);
          })
    }
  }
}

</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 10px 0;
  /* width: 80%; */
}
.usersList {
  margin: 0px auto;
}

  a{
    text-decoration: none;
    color: #ffff;
  }
</style>
