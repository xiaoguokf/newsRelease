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
          <span>审核员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link to="/admin/auditorslist">
              审核员列表
            </router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <router-link to="/admin/userslist">
              用户列表
            </router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <router-link to="/admin/banlist">
              封禁用户列表
            </router-link>
          </el-menu-item>
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
