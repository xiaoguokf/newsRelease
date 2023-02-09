<template>
  <div class="news">
    <div class="top">
      <span>
        共收到{{newsList.length}}条新闻发布信息
      </span>
      <div class="search">
        <el-input style="width: 400px;"
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" >搜索</el-button>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-plus">
          <router-link to="/personal/editor">发布新闻</router-link>
        </el-button>
      </div>
    </div>
    <div class="newsList">
      <el-table
        :data="newsList"
        style="width: 100%"
        :header-cell-style="{background:'#E8EBEF'}"
        >
        <el-table-column
          label="发布时间"
          width="260">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新闻名称"
          width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <div slot="reference" class="title-wrapper">
                <el-tag size="medium">{{ scope.row.state?'已审核':'未审核' }}</el-tag>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      newsList: [{
          createTime: '2016-05-02',
          title: '王小虎',
          type: '上海市普陀区金沙江路 1518 弄'
        }, {
          createTime: '2016-05-04',
          title: '王小虎',
          type: '上海市普陀区金沙江路 1517 弄'
        }, {
          createTime: '2016-05-01',
          title: '王小虎',
          type: '上海市普陀区金沙江路 1519 弄'
        }, {
          createTime: '2016-05-03',
          title: '王小虎',
          type: '上海市普陀区金沙江路 1516 弄'
        }]
      }
  },
  mounted() { 
    this.getNewsList();
  },
  methods: {
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
        url:"/api/news/ListRelease"
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
