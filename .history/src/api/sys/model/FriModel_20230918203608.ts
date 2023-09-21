export interface FriPageParam {
  keywords?: string
  pageNum: number
  pageSize: number
}

export interface FriListItem {
  userId?: string
  nickname: string
  homePath: string
  avatar: string
  introduce: string
}
export interface FriSearchResModel extends FriListItem {
  list: Array<FriListItem>
  total: number
}

export interface FriModel {
  publishTime?: number
  updateTime?: number
  nickname: string
  avatar: string
  homePath: string
  introduce: string
}

export interface FriTagModel {
  userId: string
}

export interface updateFriModel {
  updateTime: number
  userId: string
  nickname: string
  homePath: string
  avatar: string
  introduce: string
}
