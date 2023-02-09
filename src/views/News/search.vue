<template>
  <div>
    <el-container >
      <el-header style="padding: 0px !important;">
        <Header :info="info" />
      </el-header>
      <div v-if="type=='news'">
        <el-row class="bg-purple-light" v-for="news in news_list" :key="news.newsId">
        <el-col :span="6" v-if="news.image!=null">
            <div class="grid-content">
                <div class="three-left">
                <img v-bind:src="'https://demo.xqstudy.top'+news.image" @click="newsDetail(news.newsId)">
                </div>
            </div>
        </el-col>
        <el-col :span="news.image!=null?18:24">
            <div class="grid-content">
                <div class="two-right">
                <h6 @click="newsDetail(news.newsId)">{{news.title}}</h6>
                <label>
                    发布者：<label>{{news.username}}</label>&nbsp;&nbsp;&nbsp;
                    发布时间：{{news.showTime.substring(0,10)}}&nbsp;{{news.showTime.substring(11,16)}}
                </label>
                <p @click="newsDetail(news.newsId)">{{recomendDetail}}</p>
                </div>
            </div>
        </el-col>
        </el-row>
      </div>
      <div v-else class="box-contain">
        <el-card class="box-card" v-for="user in news_list" :key="user.userId">
          <div slot="header" class="clearfix">
            <span class="click" @click="comeTo(user.userId)">{{user.username}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" v-if="user.focus" @click="focusUser('delete',user.focusId)">取消关注</el-button>
            <el-button style="float: right; padding: 3px 0" type="text" v-else @click="focusUser('put',user.userId)">+关注</el-button>
          </div>
          <img v-if="user.avatar!=null" v-bind:src="user.avatar"/>
          <img v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        </el-card>
      </div>      
        <p v-if="this.news_get.length==0">没有更多了~</p>
      <label v-else><el-button style="width:100px; margin:10px;" @click="load(5)">查看更多</el-button></label>
    </el-container>
  </div>
</template>

<script>
import Header from '../../components/container/Header.vue';
export default {
  inject:['reload'],
  components:{ Header },
  data() {
    return {
      login: "~@/assets/img/login.png",
      info: {
        title: '新闻浏览',
        back:false
      },
      key:'',
      news_list:[],
      news_get:[],
      recomendDetail:"新时代十年，中华优秀传统文化得到创造性转化、创新性发展，文化事业日益繁荣。舞台艺术创作百花齐放，优秀作品竞相涌现。全国艺术表演团体机构数和国内演出观众人次稳步增长。2021年，全国艺术表演团体达到18370个，比2012年增加11049家。热忱描绘新时代新征程的恢弘气象，成为广大舞台艺术工作者的不懈追求和自觉实践。",
      focusId:'',
    }
  },
  methods: {
    debounce(fn, delay) {
      console.log("debounce")
      let timer = null; // 借助闭包
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, delay); // 简化写法
      };
    },
    myaxios(method,url){
      let that = this
      this.axios({
        method:method,
        url:url,
        header:{
          "token":this.token
        },
      }).then(function(response) {
        console.log(response)
        if(response.data.code===200){
          that.reload

        }else{
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
    },
    load (num) {
      let scrollTop=document.documentElement.scrollTop//滚动条在Y轴滚动过的高度
      let scrollHeight=document.documentElement.scrollHeight//滚动条的高度
      let clientHeight=document.documentElement.clientHeight//浏览器的可视高度
      if(scrollTop + clientHeight == scrollHeight||num!=null){
        console.log("load")
      // var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//变量scrollTop是滚动条滚动时，距离顶部的距离
      // var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;//变量windowHeight是可视区的高度
      // var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;//变量scrollHeight是滚动条的总高度
      // if(scrollTop+windowHeight==scrollHeight){//滚动条到底部的条件
        if(this.news_get.length==0){
          console.log('渲染完毕');
          return ;
        }else{
          let arr = this.news_get.splice(0,num)
          for (var item of arr) {
            this.news_list.push(item);
          }
          console.log('加载——列表',this.news_get)
            // console.log(this.news_list)
        }
      }
    },
    newsDetail(id){
      window.removeEventListener('scroll', this.load);
      this.$router.push("/detail/"+id)
    },
    newsClass(clas,type){
      let that = this
      this.axios({
        method:'get',
        url:'/api/search/'+type,
        header:{
          token:that.token
        },
        data:{
          "content":clas,
        }
      }).then(function(response) {
        console.log(response)
        if(response.data.code===200){
          that.news_get = [].concat(response.data.data.records)
          console.log('获取',that.news_get)
          that.load(6)
          if(type=='user') that.load(15)
        }else{
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
    },
    focusUser(mes,id){
      if(mes=="delete") this.myaxios(mes,"/api/focus/cancelFocus?focusId="+id)
      else this.myaxios(mes,"/api/focus/giveFocus?userId="+id)
    },
    comeTo(id){
      console.log(1)
      this.$router.push("/user/"+id)
    }
  },
  created(){
    this.key = this.$route.params.info
    this.type = this.$route.params.type
    document.addEventListener('scroll', this.debounce(this.load(5), 500))
    this.newsClass(this.key,this.type)
  },
  destroyed(){
    window.removeEventListener('scroll', this.load);
  },
}
</script>

<style scoped>
/* html,body,.el-container{height:100%} */
/* html, body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
} */
  .click:hover{
    cursor: pointer;
    text-decoration: underline;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 150px;
  }

  .bg-purple-light {
    border-bottom: #002FA7 1px solid;
    border-radius: 10px;
    margin: 3px 10px;
    /* margin: 10px; */
    background: #e5e9f2;
  }

  .three-left{
    width:auto;
    height: 150px;
  }

  .three-left img,.three-left div{
    width: auto;
    height: 90%;
    transform: translate(5%, 5%);
  }

  .two-right{
    width: 90%;
    height: 150px;
    transform: translate(5%, 20px);
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .two-right label{
    font-size: 14px;
    color: #4d5053d8;
  }
.two-right h6{
  margin: 0;
  font-size: 20px;
  float: left;
  font-family: Segoe UI-Bold, Segoe UI;
  font-weight: bold;
  color: #333333;
  -webkit-background-clip: text;
}
.two-right h6:hover,.two-right p:hover{
  text-decoration: underline;
  cursor: pointer;
}
.two-right p{
  font-size: 16px;
  margin: 0;
  font-family: Segoe UI-Regular, Segoe UI;
  font-weight: 400;
  color: #333333;
  line-height: 36px;
  -webkit-background-clip: text;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  word-break: break-all;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.box-contain{
  margin: 2%;
}
.box-card{
  float: left;
  width: 17%;
  height: 200px;
  margin: 1%;
}
.box-card img{
  width: auto;
  height: 100px;
}

</style>