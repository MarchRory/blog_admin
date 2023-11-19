export interface articleItemModel {
  articleId?: string
  tagId: string
  summary: string
  cover: string
  title: string
  updateTime?: Date | string
  publishTime: Date | string
  articleContent?: string // markdown, 只在提交和新增时使用这个
  views?: number // 浏览量
}

export interface delOrDetailArtcileModel {
  articleId: string
  tagId?: string // 删除时候使用
}

export interface articleContentResModel {
  articleContent: string
}

export interface articleSearchModel {
  pageNum: number
  pageSize: number
  keywords?: string
}

export interface articleSearchResModel {
  list: articleItemModel[]
  total: number
}
