import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'

import { articleItemModel, delartcileModel } from './model/articleModel'
enum API {
  articleList = '/articleList',
  articleDetail = '/article',
  addArticle = '/article',
  updateArticle = '/article',
  delArticle = '/article',
}
