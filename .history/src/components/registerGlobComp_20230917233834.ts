import type { App } from 'vue'
import { Button } from './Button'
import {
  Input,
  Layout,
  Table,
  Pagination,
  Modal,
  Form,
  FormItem,
  Popover,
  message,
  Popconfirm,
} from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Table)
    .use(Modal)
    .use(Form)
    .use(FormItem)
    .use(message)
    .use(Popover)
    .use(Pagination)
    .use(Popconfirm)
}
