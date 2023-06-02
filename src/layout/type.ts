export interface MenuItem {
  [key: string]: any
  icon?: string
  name: string
  index: string
  children?: MenuItem[]
}
