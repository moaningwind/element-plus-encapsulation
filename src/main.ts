import { createApp } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import './styles/main.css'

import.meta.glob('@/store/*.ts', { eager: true })

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(ElementPlus).use(router).mount('#app')
