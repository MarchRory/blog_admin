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
    },
    {
      path: 'editIndex', // 其上级有标记hidePathForChildren，所以本级在生成菜单时最终的path为  /level/tabs/id1
      name: 'editIndex',
      component: getParentLayout('editArticle'),
      meta: {
        title: t('routes.article.editTitle'),
        hideChildrenInMenu: true,
        hideTab: true,
      },
      redirect: '/article/index/editIndex/editArticle/:articleId',
      children: [
        {
          path: 'editArticle/:articleId',
          name: 'editArticle',
          component: () => import('/@/views/articles/children/editArticle/index.vue'),
          meta: {
            title: t('routes.article.editTitle'),
            carryParam: true,
            hideTab: true,
          },
        },
      ],
    },
  ],
}

export default articlePage
