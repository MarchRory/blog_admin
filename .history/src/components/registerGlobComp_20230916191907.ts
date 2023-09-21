import type { App } from 'vue'
import { Button } from './Button'
import { Input, Layout, Table, Pagination } from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(Table).use(Pagination)
}
