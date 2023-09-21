import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const articlePage: AppRouteModule = {
  path: '/article',
  name: 'Article',
  component: LAYOUT,
  redirect: '/article/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:tags-outlined',
    title: t('routes.tags.tags'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'articlePage',
      component: () => import('/@/views/articles/index.vue'),
      meta: {
        title: t('routes.tags.tags'),
        icon: 'ant-design:tags-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default articlePage
