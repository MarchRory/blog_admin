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
  const tagTableWidth = ref(0)
  const tableLoading = ref(false)
  const tagList = ref([] as tagListItem[])
  const tagPageConfig = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const tagColumns: TableColumnsType = [
    { title: 'LOGO', width: 25, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏', width: 50, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章', width: 20, dataIndex: 'hasNums', key: 'hasNum' },
  ]
  const loadList = () => {
    tableLoading.value = true
    getTagList({
      keywords: keywords.value,
      pageNum: tagPageConfig.value.pageNum,
      pageSize: tagPageConfig.value.pageSize,
    })
      .then((res) => {
        const { list, total } = res
        tagList.value = [...list]
        tagPageConfig.value.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  const search = () => {
    loadList()
  }
  onMounted(() => {
    tagTableHeight.value = Math.floor((tagTableContainer.value!.offsetHeight / 22) * 18)
    tagTableWidth.value = Math.floor((tagTableContainer.value!.offsetWidth / 22) * 18)
    window.addEventListener('resize', () => {
      tagTableHeight.value = Math.floor((tagTableContainer.value!.offsetHeight / 22) * 18)
      tagTableWidth.value = Math.floor((tagTableContainer.value!.offsetWidth / 22) * 18)
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {})
  })
  loadList()
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-row justify-between">
    <div
      ref="tagTableContainer"
      class="bar h-1/1 w-5/28 flex items-center flex-col px-2 justify-between py-4"
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
          :loading="tableLoading"
          :bordered="true"
          show-less-items
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

    <div class="bar h-1/1 w-22/28" style="background-color: white"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    margin: 0 auto;
    border-radius: 2px;
  }
</style>
