import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const tags: AppRouteModule = {
  path: '/tags',
  name: 'Tag',
  component: LAYOUT,
  redirect: '/tags/index',
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
      component: () => import('/@/views/tags/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'ant-design:user-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default tags
