<script lang='ts' setup>
import axios from 'axios'
import { Expand, Fold } from '@element-plus/icons-vue'
import Menu from './Menu.vue'

// import SetupMenu from './SetupMenu.vue'

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
        <div h-full flex items-center justify-between>
          <span cursor-pointer @click="collapse = !collapse">
            <Expand v-if="collapse" h4 w4 />
            <Fold v-else h4 w4 />
          </span>
          <TheHeader />
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
