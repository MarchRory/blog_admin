import { defHttp } from '/@/utils/http/axios'
import { tagPageParam, tagSearchResModel, addTagModel, tagAddResModel } from './model/tagModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  getList = '/tags/taglist',
  addTag = '/tags/tag',
  delTag = '/tags/tag',
  updateTag = '/tags/tag',
}

export async function getTagList(params: tagPageParam, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<tagSearchResModel>(
    {
      url: API.getList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function addTag(data: addTagModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.post<tagAddResModel>(
    {
      url: API.addTag,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}
