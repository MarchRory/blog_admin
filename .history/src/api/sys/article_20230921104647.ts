import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'
import {
  articleItemModel,
  delartcileModel,
  articleSearchModel,
  articleSearchResModel,
} from './model/articleModel'
enum API {
  articleList = '/articleList',
  articleDetail = '/article',
  addArticle = '/article',
  updateArticle = '/article',
  delArticle = '/article',
}

export async function getArticleList(params: articleSearchModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<articleSearchResModel>(
    {
      url: API.articleList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}
