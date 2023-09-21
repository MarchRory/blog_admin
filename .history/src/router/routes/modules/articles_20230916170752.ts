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
    icon: 'ant-design:read-outlined',
    title: t('routes.article.article'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'ArticlePage',
      component: () => import('/@/views/articles/index.vue'),
      meta: {
        title: t('routes.article.article'),
        icon: 'ant-design:read-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default articlePage
