export interface tagPageParam {
  keywords?: String
  pageNum: Number
  pageSize: Number
}

export interface tagPageResultModel {
  code: Number
  message: String | null
  result: any
}
