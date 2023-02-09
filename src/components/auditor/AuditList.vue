<template>
  <div>
    <div class="news">
    <div class="top">
      <span>
        共收到{{newsList.length}}条新闻发布信息
      </span>
      <!-- <div class="search">
        <el-input style="width: 400px;"
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" >搜索</el-button>
      </div> -->
    </div>
    <div class="newsList">
      <el-table
        :data="newsList"
        style="width: 100%"
        :header-cell-style="{background:'#E8EBEF'}"
        > 
        <el-table-column
          label="发布时间"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新闻名称"
          width="450">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <div slot="reference" class="title-wrapper">
                <el-tag size="medium">未审核</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          label="详情"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核">
          <template slot-scope="scope">
            
            <el-button size="mini" @click="open(scope.row.newsId,true)"  type="primary" >审核通过
          </el-button>
          <el-button size="mini" type="danger" @click="auditNews(scope.row.newsId)">打回</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
        </el-table>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'AuditList',
  data () {
    return {
      input:'',
      newsList: []
      }
  },
  mounted() { 
    this.getNewsList();
  },
  methods: {
    open(newsId) {
      this.$alert('审核通过后将会发布该新闻', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.auditNews(newsId, true);
          
        }
      });
    },
    // 审核新闻
    auditNews(newsId, state) {
      this.axios.put("/api/audit/changeState?newsId=" + newsId +"&state="+state).then(res => { 
        console.log(res);
        this.$message({
            type: 'success',
            message: '操作成功'
        });
        this.getNewsList();
      }).catch(err => { 
        console.log(err);
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/detail/"+row.newsId)
        
      },
    handleDelete(index, row) {
        console.log(index, row);
        this.axios({
            method: "DELETE",
            url:"/api/news/DeleteNews?newsId="+this.newsList[index].newsId
          }).then(res => {
            console.log(res);
            this.$message({
                type:'success',
                message: '删除成功'
              });
          }).catch(err => { 
            console.log(err);
          })
    },
    getNewsList() { 
      this.axios({
        method: "GET",
        url:"/api/audit/getList?current=1&size=1"
      }).then(res => { 
        console.log(res);
        this.newsList = res.data.data.records;
      }).catch(err => { 
        console.log(err);
      })
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
.newsList {
  margin: 0px auto;
}

  a{
    text-decoration: none;
    color: #ffff;
  }
</style>
