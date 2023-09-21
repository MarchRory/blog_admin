import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'
enum API {
  articleList = '/articleList',
  articleDetail = '/article',
  addArticle = '/article',
  updateArticle = '/article',
  delArticle = '/article',
}

import { articleItemModel, delartcileModel } from './model/articleModel'
