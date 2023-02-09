<template>
  <div class="aside">
    <el-row class="tac">
      <el-col >
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>新闻管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/personal/news">
              发布的新闻
            </router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/personal/draft">
              新闻草稿箱
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="1-3">收藏的新闻</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/personal/profile">
              基本信息
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="2-2">关注&粉丝</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
    </el-row>
  
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
     
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>

</style>
