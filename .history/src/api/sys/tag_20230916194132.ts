import { defHttp } from '/@/utils/http/axios'
import { tagPageParam, tagPageResultModel } from './model/tagModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  getList = '/tags/taglist',
  addTag = '/tags/tag',
  delTag = '/tags/tag',
  updateTag = '/tags/tag',
}

export async function getTagList(params: tagPageParam) {
  return await defHttp.get<tagPageParam>(
    {
      url: API.getList,
      params,
    },
    {
      errorMessageMode: 'none',
    },
  )
}
