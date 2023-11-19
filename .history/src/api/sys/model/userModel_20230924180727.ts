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

export interface userBaseInfoParams {
  nickname: string
  homePath: string
  avatar: string
  introduce: string
}

export interface contactParams {
  github: String // github 地址
  gitee: String // gitee 地址
  csdn: String // CSDN地址
  juejin: String // 掘金地址
  email: String // 邮箱
}
