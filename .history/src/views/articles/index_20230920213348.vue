<script setup lang="ts">
  import { TableColumnsType, message, FormInstance } from 'ant-design-vue'
  import { getTagList, addTag, updateTag, deleteTag } from '/@/api/sys/tag'
  import { tagListItem } from '/@/api/sys/model/tagModel'
  import { ref, onMounted, defineAsyncComponent, watch, onBeforeUnmount } from 'vue'
  const Icon = defineAsyncComponent({
    loader: () => import('/@/components/Icon'),
  })
  const keywords = ref('')
  const tableHeight = ref(0)
  const tableLoading = ref(false)
  const tagList = ref([] as tagListItem[])
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const tagColumns: TableColumnsType = [
    { title: 'LOGO', width: 15, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏', width: 60, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章', width: 20, dataIndex: 'hasNums', key: 'hasNum' },
  ]
  const loadList = () => {
    tableLoading.value = true
    getTagList({
      keywords: keywords.value,
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
    })
      .then((res) => {
        const { list, total } = res
        tagList.value = [...list]
        pagination.value.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  const search = () => {
    loadList()
  }
  onMounted(() => {
    tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    window.addEventListener('resize', () => {
      tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {})
  })
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-row justify-between">
    <div
      class="bar h-1/1 w-5/28 flex items-center flex-col px-2 justify-between py-4"
      style="background-color: rgb(255, 255, 255)"
    >
      <p class="text-lg font-bold m-0">专栏</p>
      <div class="w-1/1 h-12 flex items-center justify-between">
        <a-input
          size="default"
          style="width: 65%; height: 55%"
          v-model:value="keywords"
          placeholder="查询你的专栏"
        />
        <div class="flex">
          <a-button size="small" class="mr-2" @click="keywords = ''">重置</a-button>
          <a-button size="small" type="primary" @click="search">搜索</a-button>
        </div>
      </div>

      <div class="w-1/1 h-14/15">
        <a-table :columns="tagColumns" :data-source="tagList"> </a-table>
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
