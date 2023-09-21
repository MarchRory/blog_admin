import { defHttp } from '/@/utils/http/axios'
import { tagPageParam, ResultModel, tagSearchRes } from './model/tagModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  getList = '/tags/taglist',
  addTag = '/tags/tag',
  delTag = '/tags/tag',
  updateTag = '/tags/tag',
}

export async function getTagList(params: tagPageParam, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<tagSearchRes>(
    {
      url: API.getList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}
