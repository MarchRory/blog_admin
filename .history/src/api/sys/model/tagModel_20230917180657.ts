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

export interface TagModel {
  publishTime?: number
  updateTime?: number
  tagname: string
  tagIcon: string
}

export interface delTagModel {
  tagId: string
}

export interface updateTagModel {
  updateTime: number
  tagId: string
  tagname: string
  tagIcon: string
}
