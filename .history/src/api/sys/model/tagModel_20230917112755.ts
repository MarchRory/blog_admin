export interface tagPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

export interface tagPageResultModel {
  code: Number
  message: String | null
  result: any
}
