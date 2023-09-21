<script setup lang="ts">
  import { TableColumnsType, message, FormInstance } from 'ant-design-vue'
  import { getFriList, addFri, updateFri, deleteFri } from '/@/api/sys/Fri'
  import { FriListItem } from '/@/api/sys/model/FriModel'
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
  interface formState {
    userId?: string
    nickname: string
    homePath: string
    avatar: string
    introduce: string
  }
  const keywords = ref('')
  const tableLoading = ref(false)
  const form = ref<FormInstance>()
  const tableContainer = ref<HTMLElement | null>(null)
  const tableHeight = ref(0)
  const isUpdate = ref(false)
  const modalVisible = ref(false)
  const formState = ref({
    // 需要修改的表单内容
    userId: '',
    nickname: '',
    homePath: '',
    avatar: '',
    introduce: '',
  } as formState)
  const search = () => {
    loadList()
  }
  const openForm = () => {
    Object.keys(formState.value).forEach((key) => {
      formState.value[key] = ''
    })
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
    { title: '网名', width: 100, dataIndex: 'nickname', key: 'nickname' },
    { title: '头像', width: 100, dataIndex: 'avatar', key: 'avatar' },
    { title: '博客首页', width: 150, dataIndex: 'homePath', key: 'homePath' },
    { title: '简介', width: 100, key: 'introduce', dataIndex: 'introduce' },
    { title: '操作', width: 80, key: 'operation', fixed: 'right' },
  ]
  const friendsList = ref([] as FriListItem[])
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const loadList = () => {
    tableLoading.value = true
    getFriList({
      keywords: keywords.value,
      pageNum: pagination.value.pageNum,
      pageSize: pagination.value.pageSize,
    })
      .then((res) => {
        const { list, total } = res
        FriList.value = [...list]
        pagination.value.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  const onPageChange = (curPagination: number) => {
    pagination.value.pageNum = curPagination
  }
  const onnicknameChange = (e) => {
    formState.value.nickname = e.target.value
  }
  const onUpdateFri = () => {
    let obj = {
      userId: formState.value.userId as string,
      nickname: formState.value.nickname,
      FriIcon: formState.value.FriIcon,
      updateTime: new Date().getTime(),
    }
    updateFri(obj).then((res) => {
      if (res) {
        onCancel()
        loadList()
      }
    })
  }
  const handleSubmit = () => {
    if (!formState.value.nickname) {
      message.warning('专栏必须要有名字')
      return
    }
    if (!isUpdate.value) {
      addFri({
        nickname: formState.value.nickname,
        FriIcon: formState.value.FriIcon,
      })
    } else {
      onUpdateFri()
    }
  }
  const onSubmitSuccess = () => {
    message.success(`友链${isUpdate ? '更改' : '创建'}成功`)
    onCancel()
    loadList()
  }
  const onSubmitFailed = () => {
    message.error('遇到错误, 提交失败')
  }
  const onIconChange = (iconname: string) => {
    formState.value.FriIcon = iconname
  }
  const onCancel = () => {
    modalVisible.value = false
  }
  const edit = (record) => {
    isUpdate.value = true
    const copy = JSON.parse(JSON.stringify(record))
    formState.value.nickname = copy.nickname
    formState.value.FriIcon = copy.FriIcon
    formState.value.userId = copy.userId
    console.log(formState.value)
    modalVisible.value = true
  }
  const onConfirmFri = (id) => {
    deleteFri(id).then((res) => {
      if (res === '友链移除成功') {
        message.success(res)
        if (FriList.value.length === 1 && pagination.value.pageNum != 1) {
          pagination.value.pageNum--
        }
        loadList()
      } else {
        message.error(res)
      }
    })
  }
  const toShow = (record) => {}
  loadList()
  onMounted(() => {
    tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    window.addEventListener('resize', () => {
      tableHeight.value = Math.floor((tableContainer.value!.offsetHeight / 15) * 10)
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => {})
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
        setTimeout(() => {
          formState.value.nickname = ''
          formState.value.FriIcon = ''
          formState.value.userId = ''
          isUpdate.value = false
        }, 200)
      }
    },
  )
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="bar h-1/9 flex items-center px-12 justify-between" style="background-color: white">
      <div class="w-1/4 flex items-center">
        <span class="w-2/7">朋友网名:&nbsp; </span>
        <a-input v-model:value="keywords" placeholder="开盒！" />
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
        <div class="font-sans font-semibold text-lg">友链列表</div>
        <div class="mr-8">
          <a-button type="primary" class="mr-4" @click="openForm">新增友链</a-button>
          <a-button type="ghost" @click="loadList">刷新</a-button>
        </div>
      </div>
      <a-table
        class="h-13/16 px-2 mb-2"
        :loading="tableLoading"
        :columns="tableColumns"
        :bordered="true"
        :data-source="FriList"
        show-less-items
        :pagination="false"
        :scroll="{ x: 1000, y: tableHeight }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <div>
              <a-button type="link" @click="edit(record)">编辑</a-button>
              <a-popconfirm
                title="确定删除该专栏吗?"
                @confirm="onConfirmFri(record.userId)"
                @cancel="onCancel"
              >
                <a-button type="link" danger>删除</a-button>
              </a-popconfirm>
              <a-button type="link" @click="toShow(record)">查看</a-button>
            </div>
          </template>
          <template v-else-if="column.key === 'FriIcon'">
            <span>
              <Icon :icon="record.FriIcon" :size="25"></Icon>
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
      :maskClosable="false"
      :keyboard="false"
      @cancel="onCancel"
    >
      <div class="p-6">
        <a-form
          ref="form"
          :model="formState"
          name="FriForm"
          @submit="handleSubmit"
          @finish="onSubmitSuccess"
          @finishFailed="onSubmitFailed"
        >
          <a-form-item
            name="nickname"
            label="专栏名称"
            :rules="[{ required: true, message: '专栏至少要有名字' }]"
          >
            <a-input
              type="text"
              v-model:value="formState.nickname"
              @change="onnicknameChange"
              style="width: 60%"
              placeholder="请输入专栏名"
            />
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
