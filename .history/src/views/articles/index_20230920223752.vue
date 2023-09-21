<script setup lang="ts">
  import { TableColumnsType } from 'ant-design-vue'
  import { getTagList } from '/@/api/sys/tag'
  import { tagListItem } from '/@/api/sys/model/tagModel'
  import { ref, onMounted, defineAsyncComponent, watch, onBeforeUnmount } from 'vue'
  const Icon = defineAsyncComponent({
    loader: () => import('/@/components/Icon'),
  })
  const tagKeywords = ref('')
  const tagTableContainer = ref<HTMLElement | null>(null)
  const tagTableHeight = ref(0)
  const selectTagRowIndex = ref(null)
  const tagTable = ref()
  const tagTableWidth = ref(0)
  const tableLoading = ref(false)
  const selectedTagRecord = ref({} as any)
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
  const tagColumns: TableColumnsType = [
    { title: 'LOGO', width: 26, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏', width: 50, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章', width: 22, dataIndex: 'hasNums', key: 'hasNum' },
  ]
  const loadList = () => {
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
  const search = () => {
    loadList()
  }
  const handleTagRowClick = (record, index) => {
    return {
      onclick: () => {
        selectTagRowIndex.value = index
      },
    }
  }
  const tagRowClass = (record, index) => {
    let flag = false
    return selectTagRowIndex.value == index ? 'chosenTagRow' : ''
  }
  const handleSelectTagChange = (record, selected) => {}
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
  loadList()
  watch(
    () => tagKeywords.value,
    (newer) => {
      if (newer == '') {
        tagPage.value.pageNum = 1
        loadList()
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
          <a-button size="small" type="primary" @click="search">搜索</a-button>
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
          :onSelect="handleSelectTagChange"
          :customRow="handleTagRowClick"
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

    <div class="bar h-1/1 w-21/28" style="background-color: white"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    margin: 0 auto;
    border-radius: 2px;
  }

  ::v-deep .chosenTagRow {
    color: white;
    background-color: rgb(37, 145, 130);
  }

  ::v-deep .ant-table-tbody > tr.ant-table-row-selected td {
    background-color: unset;
  }

  ::v-deep .ant-table-tbody > tr.ant-table-row:hover > td {
    color: black;
  }
</style>
