import { defHttp } from '/@/utils/http/axios'
import { deleteFileApiResult } from './model/uploadModel'
import { ErrorMessageMode } from '/#/axios'
enum API {
  upload = '/upload',
  uploadAvatar = '/upload/avatar',
  uploadCover = '/upload/cover',
}

export interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  percent?: number
  url?: string
  preview?: string
  originFileObj?: any
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
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

export async function uploadAvatarFile(avatarFile: any, mode: ErrorMessageMode = 'modal') {
  let fd = new FormData()
  fd.append('avatar', avatarFile)
  return await defHttp.post<string>(
    {
      url: API.uploadAvatar,
      data: fd,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      onUploadProgress<onUploadProgress>(progressEvent: any) {},
    },
    {
      errorMessageMode: mode,
    },
  )
}

export async function uploadCoverFile(coverFile: any, mode: ErrorMessageMode = 'modal') {
  let fd = new FormData()
  fd.append('cover', coverFile)
  return await defHttp.post<string>(
    {
      url: API.uploadCover,
      data: fd,
      headers: {
        'Content-type': 'multipart/form-data',
      },
    },
    {
      errorMessageMode: mode,
    },
  )
}
