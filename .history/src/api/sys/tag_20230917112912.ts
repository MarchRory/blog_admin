import { defHttp } from '/@/utils/http/axios'
import { tagPageParam, ResultModel } from './model/tagModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  getList = '/tags/taglist',
  addTag = '/tags/tag',
  delTag = '/tags/tag',
  updateTag = '/tags/tag',
}

export async function getTagList(params: tagPageParam, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<ResultModel>(
    {
      url: API.getList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}