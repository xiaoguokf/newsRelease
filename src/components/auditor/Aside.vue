<template>
  <div class="aside">
    <el-row class="tac">
      <el-col >
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-document-copy"></i>
        <span slot="title">审核新闻列表</span>
      </el-menu-item>
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
      },
      handleClose(key, keyPath) {
      }
    }
}
</script>

<style scoped>

</style>
