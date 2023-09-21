import type { App } from 'vue'
import { Button } from './Button'
import { Input, Layout, Table, Pagination, Modal, Form, FormItem } from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Table)
    .use(Modal)
    .use(Form)
    .use(Pagination)
    .use(FormItem)
}
