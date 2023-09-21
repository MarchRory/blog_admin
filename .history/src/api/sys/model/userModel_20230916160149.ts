/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  result: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles?: RoleInfo[]
  // 用户id
  nickname: String
  homePath?: string
  introduce: String
  // 头像
  avatar: string
  // 介绍
  desc?: string
}
