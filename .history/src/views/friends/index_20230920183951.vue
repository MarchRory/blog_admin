<script setup lang="ts">
  import { TableColumnsType, message, FormInstance } from 'ant-design-vue'
  import type { UploadProps } from 'ant-design-vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { getFriList, addFri, updateFri, deleteFri } from '/@/api/sys/Fri'
  import { FriListItem, delFriModel } from '/@/api/sys/model/FriModel'
  import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
  import { getBase64 } from '/@/utils/file/base64Conver'
  import { toRaw } from 'vue'
  interface formState {
    userId?: string
    nickname: string
    homePath: string
    avatar: string
    introduce: string
  }
  const uploadURL = import.meta.env.VITE_GLOB_API_URL + import.meta.env.VITE_GLOB_UPLOAD_URL
  const keywords = ref('')
  const tableLoading = ref(false)
  const form = ref<FormInstance>()
  const tableContainer = ref<HTMLElement | null>(null)
  const tableHeight = ref(0)
  const isUpdate = ref(false)
  const modalVisible = ref(false)
  const avatarFileList = ref<any[]>([] as any[])
  const previewVisible = ref(false)
  const previewImage = ref('')
  const previewTitle = ref('')
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
    { title: '头像', width: 50, dataIndex: 'avatar', key: 'avatar' },
    { title: '博客首页', width: 150, dataIndex: 'homePath', key: 'homePath' },
    { title: '简介', width: 100, key: 'introduce', dataIndex: 'introduce' },
    { title: '操作', width: 100, key: 'operation', fixed: 'right' },
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
        friendsList.value = [...list]
        pagination.value.total = total
      })
      .finally(() => {
        tableLoading.value = false
      })
  }
  const onPageChange = (curPagination: number) => {
    pagination.value.pageNum = curPagination
  }
  const onUpdateFri = () => {
    let obj = {
      userId: formState.value.userId as string,
      nickname: formState.value.nickname,
      avatar: formState.value.avatar,
      homePath: formState.value.avatar,
      introduce: formState.value.introduce,
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
      message.warning('得给朋友取个名吧')
      return
    }
    if (!isUpdate.value) {
      addFri({
        nickname: formState.value.nickname,
        avatar: formState.value.avatar,
        homePath: formState.value.homePath,
        introduce: formState.value.introduce,
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
  const onAvatarChange = (avatar: string) => {
    formState.value.avatar = avatar
  }
  const onCancel = () => {
    modalVisible.value = false
  }
  const edit = (record) => {
    isUpdate.value = true
    const copy = toRaw(record)
    Object.keys(copy).forEach((key) => {
      formState.value[key] = copy[key]
    })
    modalVisible.value = true
  }
  const onConfirmFri = (id: delFriModel) => {
    deleteFri(id).then((res) => {
      if (res === '友链移除成功') {
        message.success(res)
        if (friendsList.value.length === 1 && pagination.value.pageNum != 1) {
          pagination.value.pageNum--
        }
        loadList()
      } else {
        message.error(res)
      }
    })
  }
  const toShow = (record) => {}
  const handlePreview = async (file: UploadProps['fileList'][number]) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string
    }
    previewImage.value = file.url || file.preview
    previewVisible.value = true
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
  }
  const handleCancel = () => {
    previewVisible.value = false
    previewTitle.value = ''
  }
  const handleRemove = () => {}
  const handleUploadChange = (res) => {
    if (res.file.status == 'done') {
      console.log(res)
      const { result } = res.file.response
      formState.value.avatar = result
      message.success('头像上传成功')
    }
  }
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
        isUpdate.value = false
        setTimeout(() => {
          Object.keys(formState.value).forEach((key) => {
            formState.value[key] = ''
          })
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
        :data-source="friendsList"
        show-less-items
        :pagination="false"
        :scroll="{ x: 1000, y: tableHeight }"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.key === 'operation'">
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
          <div v-else-if="column.key === 'avatar'" class="h-max w-auto rounded-lg overflow-hiddenS">
            <!--  <a-image :width="60" :height="60" :src="record.avatar" /> -->
            <img class="object-cover" :src="record.avatar" alt="" />
          </div>
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
      :title="`${isUpdate ? '更新' : '新增'}友链`"
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
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 16 }"
        >
          <a-form-item name="avatar" label="头像">
            <a-upload
              accept=".png,.jpg,.jpeg,.gif"
              v-model:file-list="avatarFileList"
              :action="uploadURL"
              list-type="picture-card"
              :withCredentials="false"
              :max-count="1"
              name="avatar"
              method="post"
              @preview="handlePreview"
              @remove="handleRemove"
              @change="handleUploadChange"
            >
              <div v-if="avatarFileList.length < 2">
                <plus-outlined />
                <div style="margin-top: 8px">上传头像</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item
            name="nickname"
            label="朋友名字"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-input
              type="text"
              v-model:value="formState.nickname"
              style="width: 80%"
              placeholder="网名也可以, 字词实名冲浪"
            />
          </a-form-item>
          <a-form-item
            name="homePath"
            label="博客主页地址"
            :rules="[{ required: true, message: '其实QQ空间也不是不能......' }]"
          >
            <a-input
              type="text"
              v-model:value="formState.homePath"
              style="width: 80%"
              placeholder="还没有就先搁吧"
            />
          </a-form-item>
          <a-form-item name="homePath" label="友链简介">
            <a-textarea
              v-model:value="formState.introduce"
              style="width: 80%"
              show-count
              :maxlength="100"
              placeholder="大佬带带我"
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
