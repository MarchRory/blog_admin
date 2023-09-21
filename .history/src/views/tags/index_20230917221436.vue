<script setup lang="ts">
  import { TableColumnsType, message } from 'ant-design-vue'
  import { getTagList, addTag, updateTag } from '/@/api/sys/tag'
  import { tagListItem } from '/@/api/sys/model/tagModel'
  import { ref, onMounted, defineAsyncComponent, watch } from 'vue'
  import { IconPicker } from '/@/components/Icon' // 图标选择器需要直接引入
  interface formState {
    tagname: string
    tagIcon: string
  }
  const Icon = defineAsyncComponent({
    loader: () => import('/@/components/Icon'),
  })
  /*   interface dataItem {
        _id: String
        userId: String
        tagname: String
        tagIcon: String
        hasNums: Number
      } */
  const keywords = ref('')
  const tableLoading = ref(false)
  const tableContainer = ref<HTMLElement | null>(null)
  const tableHeight = ref(0)
  const isUpdate = ref(false)
  const modalVisible = ref(false)
  const IconSize = ref(24)
  const formState = ref({
    // 需要修改的表单内容
    tagname: '',
    tagIcon: '',
  } as formState)
  const chosenIcon = ref('' as any)
  const search = () => {
    loadList()
  }
  const openForm = (info: formState) => {
    if (!info) {
      formState.value.tagname = ''
      formState.value.tagIcon = ''
    } else {
      let obj = JSON.parse(JSON.stringify(info))
      formState.value.tagname = obj.tagname
      formState.value.tagIcon = obj.tagIcon
    }
    modalVisible.value = true
  }
  // const dialogVisible: boolean = ref(false)
  const tableColumns: TableColumnsType = [
    {
      title: '序号',
      width: 30,
      key: '_id',
      customRender: ({ text, record, index }) => `${index + 1}`,
      fixed: 'left',
    },
    { title: 'LOGO', width: 60, dataIndex: 'tagIcon', key: 'tagIcon' },
    { title: '专栏名', width: 150, dataIndex: 'tagname', key: 'tagname' },
    { title: '文章数量', width: 80, dataIndex: 'hasNums', key: 'hasNum' },
    { title: '操作', width: 100, key: 'operation', fixed: 'right' },
  ]
  const tagList = ref([] as tagListItem[])
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
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
  const onPageChange = (curPagination: number) => {
    pagination.value.pageNum = curPagination
  }
  const onTagnameChange = (e) => {
    formState.value.tagname = e.target.value
  }
  const onUpdateTag = (tagId: string) => {
    let obj = {
      tagId: tagId,
      tagname: formState.value.tagname,
      tagIcon: formState.value.tagIcon,
      updateTime: new Date().getTime(),
    }
    updateTag(obj)
  }
  const handleSubmit = (tagId: string) => {
    if (!formState.value.tagname) {
      message.warning('专栏必须要有名字')
      return
    }
    if (!isUpdate.value) {
      addTag(formState.value)
    } else {
      onUpdateTag(tagId)
    }
  }
  const onSubmitSuccess = () => {
    message.success(`专栏${isUpdate ? '更改' : '创建'}成功`)
    onCancel()
    loadList()
  }
  const onSubmitFailed = () => {
    message.error('遇到错误, 提交失败')
  }
  const onIconChange = (iconname: string) => {
    formState.value.tagIcon = iconname
  }
  const onCancel = () => {
    modalVisible.value = false
    console.log(modalVisible.value)
  }
  loadList()
  onMounted(() => {
    tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    window.addEventListener('resize', () => {
      tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    })
  })
  watch(
    () => pagination.value.pageNum,
    () => {
      loadList()
    },
  )
  watch(
    () => keywords.value,
    (newer) => {
      if (newer == '') {
        loadList()
      }
    },
  )
  watch(
    () => modalVisible.value,
    (newer) => {
      if (newer === false) {
        formState.value.tagname = ''
        formState.value.tagIcon = ''
      }
    },
  )
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="bar h-1/9 flex items-center px-12 justify-between" style="background-color: white">
      <div class="w-1/4 flex items-center">
        <span class="w-2/7">专栏名称:&nbsp; </span>
        <a-input v-model:value="keywords" placeholder="查询你的专栏" />
      </div>
      <div>
        <a-button class="mr-4" @click="keywords = ''" :disabled="keywords == ''">重置</a-button>
        <a-button type="primary" @click="search" :disabled="keywords == ''">搜索</a-button>
      </div>
    </div>

    <div
      ref="tableContainer"
      class="bar h-13/15 flex flex justify-start flex-col"
      style="background-color: white"
    >
      <div class="h-1/13 w-1/1 p-6 flex items-center justify-between">
        <div class="font-sans font-semibold text-lg">专栏列表</div>
        <div class="mr-8">
          <a-button type="primary" class="mr-4" @click="openForm">创建专栏</a-button>
          <a-button type="ghost" @click="loadList">刷新</a-button>
        </div>
      </div>
      <a-table
        class="h-13/16 px-2 mb-2"
        :loading="tableLoading"
        :columns="tableColumns"
        :bordered="true"
        :data-source="tagList"
        show-less-items
        :pagination="false"
        :scroll="{ x: 1000, y: tableHeight }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a>action</a>
          </template>
          <template v-else-if="column.key === 'tagIcon'">
            <span>
              <Icon :icon="record.tagIcon" :size="25"></Icon>
            </span>
          </template>
        </template>
      </a-table>
      <a-pagination
        class="flex justify-end"
        v-model:current="pagination.pageNum"
        :total="pagination.total"
        :show-total="(total:number) => `共${total}项`"
        @change="onPageChange"
      />
    </div>

    <!-- 弹出层 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="`${isUpdate ? '更新' : '新增'}专栏`"
      :footer="null"
    >
      <div class="p-6">
        <a-form
          :model="formState"
          name="tagForm"
          @submit="handleSubmit"
          @finish="onSubmitSuccess"
          @finishFailed="onSubmitFailed"
        >
          <a-form-item
            name="tagname"
            type="text"
            label="专栏名称"
            v-bind="formState.tagname"
            :rules="[{ required: true, message: '专栏至少要有名字' }]"
          >
            <a-input
              type="text"
              v-model:value="formState.tagname"
              @change="onTagnameChange"
              style="width: 60%"
              placeholder="请输入专栏名"
            />
          </a-form-item>
          <a-form-item name="tagIcon" label="专栏logo">
            <Icon-picker
              :value="chosenIcon"
              width="60%"
              :page-size="30"
              :size="IconSize"
              mode="iconify"
              @change="onIconChange"
            ></Icon-picker>
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <div class="mt-8">
              <a-button @click="onCancel" class="mr-6">取消</a-button>
              <a-button type="primary" html-type="submit">提交</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
  .bar {
    width: 98%;
    margin: 0 auto;
    border-radius: 2px;
  }
</style>
