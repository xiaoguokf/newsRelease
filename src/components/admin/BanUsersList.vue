<template>
  <div class="news">
    <div class="top">
      <span>
        共有<span style="color: #f56c6c;">{{usersList.length}}</span>位封禁用户信息
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
          width="100">
          <template slot-scope="scope">
            <span  >{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户账号"
          width="200">
          <template slot-scope="scope">
            <span  >{{ scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="250">
          <template slot-scope="scope">
            <span  >{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          width="250">
          <template slot-scope="scope">
            <span  >{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <div slot="reference" class="title-wrapper">
                <el-tag size="medium">封禁中</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">解除封禁</el-button>

          </template>
        </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data () {
    return {
      input:'',
      usersList: []
      }
  },
  mounted() { 
    this.getUsersList();
  },
  methods: {
    handleEdit(index, row) {
      this.bannedUser(row.userId);
      },
      bannedUser(userId) {
      this.axios({
        method: "POST",
        url: "/api/admin/bannedUser",
        data: {
          userId:userId,
          duration:0,
          }
          }).then(res => {
            console.log(res);
            if (res.data.code=="200") {
              this.$message({
                type:'success',
                message: '操作成功'
              });
            }
            this.getUsersList(); 
          }).catch(err => { 
            console.log(err);
          })
    },
    getUsersList() { 
      this.axios({
        method: "GET",
        url:"/api/admin/listBanned?current=2&size=1"
      }).then(res => { 
        console.log(res);
        this.usersList = res.data.data.records;
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
