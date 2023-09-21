import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const talkPage: AppRouteModule = {
  path: '/talk',
  name: 'Tag',
  component: LAYOUT,
  redirect: '/talk/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:dropbox-outlined',
    title: t('routes.tags.tags'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'talkPage',
      component: () => import('/@/views/talk/index.vue'),
      meta: {
        title: t('routes.tags.tags'),
        icon: 'ant-design:dropbox-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default talkPage
