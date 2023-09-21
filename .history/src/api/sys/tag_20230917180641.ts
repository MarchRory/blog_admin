import { defHttp } from '/@/utils/http/axios'
import { tagPageParam, tagSearchResModel, TagModel } from './model/tagModel'
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

export async function addTag(data: TagModel, mode: ErrorMessageMode = 'modal') {
  data.publishTime = new Date().getTime()
  return await defHttp.post(
    {
      url: API.addTag,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function updateTag(data: TagModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.put(
    {
      url: API.updateTag,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}
