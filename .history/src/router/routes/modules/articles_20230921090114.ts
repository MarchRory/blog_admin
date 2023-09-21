import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
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
        hideChildrenInMenu: true,
      },
      children: [
        {
      children: [
        path: 'tabs/id1', // 其上级有标记hidePathForChildren，所以本级在生成菜单时最终的path为  /level/tabs/id1
        name: 'TabsParams',
        component: getParentLayout('TabsParams'),
        meta: {
          carryParam: true,
          ignoreRoute: true,  // 本路由仅用于菜单生成，不会在实际的路由表中出现
        },
      }
        }

      ]
    },
  ],
}

export default articlePage
