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
  return await defHttp.get<articleContentResModel>(
    {
      url: API.articleDetail,
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

export async function updateArticle(data: articleItemModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.patch(
    {
      url: API.updateArticle,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function delArticle(
  delParams: delOrDetailArtcileModel,
  mode: ErrorMessageMode = 'modal',
) {
  return await defHttp.delete<articleContentResModel>(
    {
      url: `${API.delArticle}/${delParams.articleId}/${delParams.tagId}`,
    },
    {
      errorMessageMode: mode,
    },
  )
}
