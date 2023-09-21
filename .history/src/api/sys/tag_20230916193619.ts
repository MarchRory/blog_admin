import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'

enum API {
  getList = '/tags/taglist',
  addTag = '/tags/tag',
  delTag = '/tags/tag',
  updateTag = '/tags/tag',
}
