export interface tagPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

export interface tagPageResultModel {
  code: number
  message: string | null
  result: any
}
