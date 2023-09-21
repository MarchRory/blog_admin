<script setup lang="ts">
  import type { TableColumnsType } from 'ant-design-vue'
  import { ref } from 'vue'
  import { getTagList } from '/@/api/sys/tag.ts'
  interface dataItem {
    tagname: Stirng
    tagIcon: String
    hasNums: Number
  }
  const keywords: String = ref('')
  const search = () => {
    getTagList({ ...pagination })
  }
  const openDialog = () => {}
  const refresh = () => {}
  const dialogVisible: boolean = ref(false)
  const tableColumns: TableColumnsType = [
    { title: '序号', width: 50, dataIndex: 'tagname', key: 'tagname', fixed: 'left' },
    { title: 'LOGO', width: 60, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏名', width: 150, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章数量', width: 80, dataIndex: 'hasNums', key: 'hasNums' },
    { title: '操作', width: 100, key: 'operation', fixed: 'right' },
  ]
  const tagList: dataItem[] = ref([])
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const loadList = () => {}
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="bar h-1/9 flex items-center px-12 justify-between" style="background-color: white">
      <div class="w-1/4 flex items-center">
        <span class="w-2/7">专栏名称:&nbsp; </span>
        <a-input v-model:value="keywords" placeholder="查询你的专栏" />
      </div>
      <div>
        <a-button class="mr-4" @click="keywords.value = ''">重置</a-button>
        <a-button type="primary" @click="search">搜索</a-button>
      </div>
    </div>

    <div class="bar h-13/15 flex flex justify-start flex-col" style="background-color: white">
      <div class="h-1/13 w-1/1 p-6 flex items-center justify-between">
        <div class="font-sans font-semibold text-lg">专栏列表</div>
        <div class="mr-8">
          <a-button type="primary" class="mr-4" @click="openDialog">创建专栏</a-button>
          <a-button type="ghost" @click="refresh">刷新</a-button>
        </div>
      </div>

      <a-table
        class="h-13/16 px-2"
        :columns="tableColumns"
        :data-source="tagList"
        show-less-items
        :scroll="{ x: 1000, y: 300 }"
        :pagination="pagination"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>action</a>
          </template>
        </template>
      </a-table>
      <a-pagination
        class="flex justify-end"
        v-model:current="pagination.pageNum"
        :total="pagination.total"
        :show-total="(total) => `共${total}项`"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    width: 98%;
    margin: 0 auto;
    border-radius: 2px;
  }
</style>
