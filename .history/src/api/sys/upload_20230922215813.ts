import { defHttp } from '/@/utils/http/axios'
import { deleteFileApiResult } from './model/uploadModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  upload = '/upload',
  uploadAvatar = '/upload/avatar',
}

export async function deleteFile(filename: string, mode: ErrorMessageMode = 'modal') {
  return await defHttp.delete<deleteFileApiResult>(
    {
      url: API.upload + `/${filename}`,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function uploadAvatarFile(data: FormData, mode: ErrorMessageMode = 'modal') {
  return await defHttp.delete<deleteFileApiResult>(
    {
      url: API.uploadAvatar,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}
