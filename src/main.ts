import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'

import { toLine } from '@/utils'

import './styles/main.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

for (const i in Icons)
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])

app.use(ElementPlus).use(router).mount('#app')
