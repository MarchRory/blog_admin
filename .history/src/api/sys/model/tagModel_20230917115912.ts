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
export interface tagSearchResModel extends tagListItem {
  list: Array<tagListItem>
  total: number
}
