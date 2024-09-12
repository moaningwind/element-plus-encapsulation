import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'element-plus/dist/index.css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'

import.meta.glob('@/store/*.ts', { eager: true })

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(ElementPlus).use(router).mount('#app')
