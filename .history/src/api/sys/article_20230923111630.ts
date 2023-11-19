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
  articleList = '/article/list',
  articleDetail = '/article',
  addArticle = '/article',
  updateArticle = '/article',
  delArticle = '/article',
  downloadFile = '/article/download',
}

export async function getArticleList(params: articleSearchModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<articleSearchResModel>(
    {
      url: API.articleList,
      params,
      timeout: 10 * 1000,
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
      params: { articleId: params.articleId },
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function addArticle(data: articleItemModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.post(
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
  return await defHttp.put(
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
  return await defHttp.delete<delOrDetailArtcileModel>(
    {
      url: `${API.delArticle}/${delParams.articleId}/${delParams.tagId}`,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * 导出文章的md文件
 * @param params articleId
 * @returns
 */
export async function downLoadArticleMd(
  params: delOrDetailArtcileModel,
  mode: ErrorMessageMode = 'modal',
) {
  return await defHttp.get(
    {
      url: API.downloadFile,
      params,
      responseType: 'blob',
    },
    {
      errorMessageMode: mode,
    },
  )
}
