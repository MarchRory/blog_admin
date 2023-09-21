interface articleItemModel {
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

interface delartcileModel {
  articleId: string
}
