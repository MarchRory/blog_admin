import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const articlePage: AppRouteModule = {
  path: '/friendsPage',
  name: 'Article',
  component: LAYOUT,
  redirect: '/friendsPage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:read-outlined',
    title: t('routes.friends.friendsPage'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'friendsPage',
      component: () => import('/@/views/friends/index.vue'),
      meta: {
        title: t('routes.friends.friendsPage'),
        icon: 'ant-design:read-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default articlePage
