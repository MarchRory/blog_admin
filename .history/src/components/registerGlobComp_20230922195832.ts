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
  Upload,
  Spin,
} from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Table)
    .use(Modal)
    .use(Upload)
    .use(Form)
    .use(FormItem)
    .use(Spin)
    .use(message)
    .use(Popover)
    .use(Pagination)
    .use(Popconfirm)
}
