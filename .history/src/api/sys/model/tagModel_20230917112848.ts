export interface tagPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

export interface ResultModel {
  code: number
  message: string | null
  result: any
}
