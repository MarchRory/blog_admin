import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:user-outlined',
    title: t('routes.user.user'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/user/index.vue'),
      meta: {
        title: t('routes.user.user'),
        icon: 'ant-design:user-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default user
