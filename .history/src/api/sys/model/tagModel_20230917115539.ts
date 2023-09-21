export interface tagPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

export interface tagListItem {
  _id: string
  tagname: string
  tagIcon: string
  hasNum: number
}
interface tagSearchRes extends tagListItem {
  list: Array<listItem>
  total: number
}

export interface ResultModel {
  code: number
  message: string | null
  result: tagSearchRes
}
