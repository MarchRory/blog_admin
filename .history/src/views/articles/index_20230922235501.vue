<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ArticlePage',
  })
</script>
<script setup lang="ts">
  import { TableColumnsType, message } from 'ant-design-vue'
  import { getTagList } from '/@/api/sys/tag'
  import { tagListItem } from '/@/api/sys/model/tagModel'
  import { getArticleList, delArticle, downLoadArticleMd } from '/@/api/sys/article'
  import {
    articleItemModel,
    delOrDetailArtcileModel,
    articleSearchResModel,
  } from '/@/api/sys/model/articleModel'
  import { ref, onMounted, defineAsyncComponent, watch, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  const route = useRouter()
  const Icon = defineAsyncComponent({
    loader: () => import('/@/components/Icon'),
  })
  const tagKeywords = ref('')
  const tagTableContainer = ref<HTMLElement | null>(null)
  const tagTableHeight = ref(0)
  const selectTagRowIndex = ref(-1)
  const articleTableLoading = ref(false)
  const tagTable = ref()
  const tagTableWidth = ref(0)
  const tableLoading = ref(false)
  const selectedTagId = ref<delOrDetailArtcileModel>()
  const tagList = ref([] as tagListItem[])
  const tagPage = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const tagPageConfig = ref({
    responsive: true,
    showTotal: (total: number) => `专栏总数: ${total}`,
    current: tagPage.value.pageNum,
    pageSize: tagPage.value.pageSize,
    total: tagPage.value.total,
    showQuickJumper: true,
  })
  const articlePage = ref({
    pageNum: 1,
    pageSize: 15,
    total: 0,
  })
  const articleKeywords = ref('')
  const articlePageConfig = ref({
    responsive: true,
    showTotal: (total: number) => `文章总数: ${total}`,
    current: articlePage.value.pageNum,
    pageSize: articlePage.value.pageSize,
    total: articlePage.value.total,
    showQuickJumper: true,
  })
  const tagColumns: TableColumnsType = [
    { title: 'LOGO', width: 26, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏', width: 50, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章', width: 22, dataIndex: 'hasNums', key: 'hasNum' },
  ]
  const articleList = ref([] as articleItemModel[])
  const articleColumns: TableColumnsType = [
    {
      title: '序号',
      width: 40,
      key: 'articleId',
      customRender: ({ text, record, index }) => `${index + 1}`,
      fixed: 'left',
    },
    { title: '封面', width: 100, dataIndex: 'cover', key: 'cover' },
    { title: '文章', width: 120, dataIndex: 'title', key: 'dataIndex' },
    { title: '发布时间', width: 80, dataIndex: 'publishTime', key: 'publishTime' },
    { title: '上次更新', width: 80, dataIndex: 'updateTime', key: 'updateTime' },
    { title: '浏览量', width: 60, dataIndex: 'views', key: 'views' },
    { title: '操作', width: 40, key: 'operation', fixed: 'right' },
  ]

  const loadTagList = () => {
    tableLoading.value = true
    getTagList({
      keywords: tagKeywords.value,
      pageNum: tagPage.value.pageNum,
      pageSize: tagPage.value.pageSize,
    })
      .then((res) => {
        const { list, total } = res
        tagList.value = [...list]
        tagPage.value.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  const searchTag = () => {
    tagPageConfig.value.current = 1
    loadTagList()
  }
  const handleTagCustomRow = (record: tagListItem, index: number) => {
    return {
      onclick: () => {
        // 获取文章列表
        selectedTagId.value = record.tagId as unknown as delOrDetailArtcileModel
        loadArticleList()
        selectTagRowIndex.value = index
      },
    }
  }
  const tagRowClass = (record, index) => {
    return selectTagRowIndex.value == index ? 'chosenTagRow' : ''
  }
  const loadArticleList = () => {
    articleTableLoading.value = true
    getArticleList({
      tagId: selectedTagId.value as unknown as string,
      pageNum: articlePage.value.pageNum,
      pageSize: articlePage.value.pageSize,
      keywords: articleKeywords.value,
    })
      .then((res: articleSearchResModel) => {
        const { list, total } = res
        articleList.value = list
        articlePage.value.total = total
      })
      .finally(() => {
        articleTableLoading.value = false
      })
  }
  const delChosenArticle = (record) => {
    delArticle({
      articleId: record.articleId,
      tagId: selectedTagId.value,
    } as delOrDetailArtcileModel).then((res: any) => {
      if (res === 200) {
        message.success('文章删除成功')
      }
    })
  }
  const openArticle = (record) => {
    route.push({
      path: '/article/editArticle',
      query: { tagId: selectedTagId.value as unknown as string, isNew: 0, ...record },
    })
  }
  const toShow = (record) => {}
  const edit = (record) => {}
  const onConfirmDel = (articleId) => {}
  const onCancel = () => {}
  const searchArticle = () => {
    articlePageConfig.value.current = 1
    loadArticleList()
  }
  const wrireNewArticle = () => {
    if (!selectedTagId.value) {
      message.warning('还没有选择文章所属专栏哦')
      return
    }
    route.push({
      path: '/article/editArticle',
      query: { tagId: selectedTagId.value as unknown as string, isNew: 1 },
    })
  }
  onMounted(() => {
    tagTableHeight.value = Math.floor((tagTableContainer.value!.offsetHeight / 16) * 10)
    tagTableWidth.value = Math.floor((tagTableContainer.value!.offsetWidth / 22) * 18)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        tagTableHeight.value = Math.floor((tagTableContainer.value!.offsetHeight / 16) * 10)
        tagTableWidth.value = Math.floor((tagTableContainer.value!.offsetWidth / 22) * 18)
      }, 280)
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {})
  })
  loadTagList()
  watch(
    () => tagKeywords.value,
    (newer) => {
      if (newer == '') {
        tagPage.value.pageNum = 1
        loadTagList()
      }
    },
  )
  watch(
    () => articleKeywords.value,
    (newer) => {
      if (!newer) {
        articlePageConfig.value.current = 1
        loadArticleList()
      }
    },
  )
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-row justify-between">
    <div
      ref="tagTableContainer"
      class="bar h-1/1 w-6/28 flex items-center flex-col px-2 justify-between py-4"
      style="background-color: rgb(255, 255, 255)"
    >
      <p class="text-lg font-bold m-0">专栏</p>
      <div class="w-1/1 h-12 flex items-center justify-between">
        <a-input
          size="default"
          style="width: 65%; height: 55%; margin-right: 5px"
          v-model:value="tagKeywords"
          placeholder="查询你的专栏"
        />
        <div class="flex">
          <a-button size="small" class="mr-1" @click="tagKeywords = ''">重置</a-button>
          <a-button size="small" type="primary" @click="searchTag">搜索</a-button>
        </div>
      </div>

      <div class="w-1/1 h-14/15">
        <a-table
          class="w-1/1 h-1/1"
          :columns="tagColumns"
          :data-source="tagList"
          ref="tagTable"
          :rowClassName="tagRowClass"
          :loading="tableLoading"
          :scrollToFirstRowOnChange="true"
          :bordered="true"
          show-less-items
          :customRow="handleTagCustomRow"
          :pagination="tagPageConfig"
          :scroll="{ x: tagTableWidth, y: tagTableHeight }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'tagIcon'">
              <span>
                <Icon :icon="record.tagIcon" :size="25"></Icon>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <div
      class="bar h-1/1 w-21/28 p-2 flex flex-col items-center justify-between"
      style="background-color: white"
    >
      <div class="w-1/1 h-1/1">
        <div
          class="bar h-1/9 flex items-center px-12 justify-between"
          style="background-color: white"
        >
          <div class="w-1/4 flex items-center">
            <span class="w-3/7">搜索文章:&nbsp; </span>
            <a-input v-model:value="articleKeywords" placeholder="输入标题关键字" />
          </div>
          <div>
            <a-button class="mr-4" @click="wrireNewArticle" type="primary">写文章</a-button>
            <a-button class="mr-4" @click="articleKeywords = ''" :disabled="articleKeywords == ''"
              >重置</a-button
            >
            <a-button type="primary" @click="searchArticle" :disabled="articleKeywords == ''"
              >搜索</a-button
            >
          </div>
        </div>
        <a-table
          :columns="articleColumns"
          :data-source="articleList"
          :loading="articleTableLoading"
          :pagination="articlePageConfig"
          show-less-items
          :bordered="true"
          :scroll="{ x: true, y: 900 }"
        >
          <template #bodyCell="{ column, record }">
            <div v-if="column.key === 'operation'">
              <a-button type="link" size="small" @click="toShow(record)">查看</a-button>
              <a-button type="link" size="small" @click="edit(record)">编辑</a-button>
              <a-popconfirm
                title="确定删除这篇文章吗?"
                @confirm="onConfirmDel(record.userId)"
                @cancel="onCancel"
              >
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </div>
            <div v-else-if="column.key === 'cover'" class="h-80px rounded-lg">
              <img class="object-cover h-80px" :src="record.cover" alt="封面" />
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    margin: 0 auto;
    border-radius: 2px;
  }

  :deep(.chosenTagRow) {
    color: white !important;
    background-color: rgb(37, 145, 130) !important;
  }

  :deep(.ant-table-tbody > tr.ant-table-row-selected td) {
    background-color: unset;
  }

  :deep(.ant-table-tbody > tr.ant-table-row:hover > td) {
    color: black;
  }
</style>
