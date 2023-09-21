import { defHttp } from '/@/utils/http/axios'
import {
  FriPageParam,
  FriSearchResModel,
  FriModel,
  updateFriModel,
  delFriModel,
} from './model/FriModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  getList = '/friends',
  addFri = '/friends',
  delFri = '/friends',
  updateFri = '/friends',
}

export async function getFriList(params: FriPageParam, mode: ErrorMessageMode = 'modal') {
  return await defHttp.get<FriSearchResModel>(
    {
      url: API.getList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function addFri(data: FriModel, mode: ErrorMessageMode = 'modal') {
  data.publishTime = new Date().getTime()
  return await defHttp.post(
    {
      url: API.addFri,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function updateFri(data: updateFriModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.put(
    {
      url: API.updateFri,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function deleteFri(FriId: delFriModel, mode: ErrorMessageMode = 'modal') {
  return await defHttp.delete(
    {
      url: API.delFri + '/' + FriId,
    },
    {
      errorMessageMode: mode,
    },
  )
}
