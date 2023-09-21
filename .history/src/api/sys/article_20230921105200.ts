import { defHttp } from '/@/utils/http/axios'
import { ErrorMessageMode } from '/#/axios'
import {
  articleItemModel,
  delOrDetailArtcileModel,
  articleContentResModel,
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

export async function getArticleDetail(
  params: delOrDetailArtcileModel,
  mode: ErrorMessageMode = 'modal',
) {
  return await defHttp.get<>(
    {
      url: API.articleList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function addArticle(data: articleItemModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.put(
    {
      url: API.addArticle,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}
