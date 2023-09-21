export interface tagPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

interface listItem {
  _id: string
  tagname: string
  tagIcon: string
  hasNum: number
}
interface tagSearchRes extends listItem {
  list: Array<listItem>
  total: number
}

export interface ResultModel {
  code: number
  message: string | null
  result: tagSearchRes
}
