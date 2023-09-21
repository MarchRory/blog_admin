export interface articleItemModel {
  articleId?: string
  tagId: string
  summary: string
  cover: string
  title: string
  updateTime?: Date
  publishTime: Date
  articleContent?: string // markdown, 只在提交和新增时使用这个
  views?: number // 浏览量
}

export interface delOrDetailArtcileModel {
  articleId: string
  tagId?: string
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
