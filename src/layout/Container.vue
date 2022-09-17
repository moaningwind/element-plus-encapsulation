<script lang='ts' setup>
import axios from 'axios'
// import SetupMenu from './SetupMenu.vue'
import Menu from './Menu.vue'

const collapse = ref(false)
const menuData = shallowRef([])

onMounted(() => {
  axios.get('/api/menu').then((res) => {
    menuData.value = res.data.data
  })
})
</script>

<template>
  <el-container>
    <el-aside>
      <!-- 启用 vue-router 模式 -->
      <Menu
        router
        :collapse="collapse"
        :menu-data="menuData"
        :default-active="$route.path"
      />
    </el-aside>
    <el-container>
      <el-header>
        <div h-full flex justify-between items-center>
          <span cursor-pointer @click="collapse = !collapse">
            <el-icon-expand v-if="collapse" w4 h4 />
            <el-icon-fold v-else w4 h4 />
          </span>
          <Footer />
        </div>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  border-bottom: 1px solid var(--el-menu-border-color);
}
</style>
