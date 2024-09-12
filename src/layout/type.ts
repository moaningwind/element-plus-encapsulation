import Container from './Container.vue'

export interface MenuItem {
  [key: string]: any
  icon?: string
  name: string
  index: string
  children?: MenuItem[]
}

console.log(Container)
