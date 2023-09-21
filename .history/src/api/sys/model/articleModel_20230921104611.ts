export interface articleItemModel {
  articleId?: string
  tagId: string
  summary: string
  cover: string
  title: string
  updateTime?: Date
  publishTime: Date
  articleContent?: string // markdown
  views?: number // 浏览量
}

export interface delartcileModel {
  articleId: string
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
