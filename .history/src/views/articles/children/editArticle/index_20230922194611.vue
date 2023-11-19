<template>
  <a-spin :spinning="loading" tip="加载中...">
    <div class="flex items-center w-1/1 justify-between p-4 flex-col">
      <div class="flex items-center justify-between w-9/10 h-3/10 mb-4">
        <a-input
          placeholder="在这里输入标题"
          addon-before="文章标题"
          :showCount="true"
          size="large"
          :value="articleInfo.title"
          class="mr-4"
        />
        <div class="flex">
          <a-button class="mr-4" size="large" @click="articleInfo.title = ''"> 重置 </a-button>
          <a-button type="primary" size="large" @click="publish">{{
            isNew === '1' ? '发布' : '更新'
          }}</a-button>
        </div>
      </div>
      <div id="vditor"></div>
    </div>
    <a-modal v-model:visible="modelVisible" title="文章简介" @ok="handlSubmit" @cancel="onCancel">
      <a-form
        ref="form"
        :model="lastForm"
        name="lastForm"
        @submit="handleSubmit"
        @finish="onSubmitSuccess"
        @finishFailed="onSubmitFailed"
        :labelCol="{ span: 8 }"
        :wrapperCol="{ span: 16 }"
      >
        <a-form-item name="cover" label="文章封面">
          <a-upload
            accept=".png,.jpg,.jpeg,.gif"
            v-model:file-list="coverFileList"
            :action="uploadURL"
            list-type="picture-card"
            :withCredentials="false"
            :max-count="1"
            name="cover"
            method="post"
            @remove="handleRemove"
            @change="handleUploadChange"
          >
            <div v-if="coverFileList.length < 2">
              <plus-outlined />
              <div style="margin-top: 8px">设置封面</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item name="summary" label="文章简介">
          <a-textarea
            v-model:value="lastForm.summary"
            style="width: 80%"
            show-count
            :maxlength="100"
            placeholder="大佬带带我"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <div class="mt-8">
            <a-button @click="onCancel" class="mr-6">取消</a-button>
            <a-button type="primary" html-type="submit">{{
              isNew === '1' ? '发布' : '更新'
            }}</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-spin>
</template>
<script>
  import { defineComponent } from 'vue'
  import { message } from 'ant-design-vue'
  import { lstat } from 'fs'
  export default defineComponent({
    // 需要和路由的name一致
    name: 'editArticle',
  })
</script>
<script setup>
  import { ref, onMounted, toRaw } from 'vue'
  import { useRoute } from 'vue-router'
  import { getArticleDetail } from '/@/api/sys/article'
  import { addArticle, updateArticle } from '/@/api/sys/article'
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  import { mdEditorOpts } from '/@/utils/markdown/index'
  const uploadURL = import.meta.env.VITE_GLOB_API_URL + import.meta.env.VITE_GLOB_UPLOAD_URL
  const route = useRoute()
  const articleInfo = ref({
    tagId: '',
    summary: '',
    cover: '',
    title: '',
    content: '',
    publishTime: '',
    updateTime: '',
  })
  articleInfo.value.tagId = route.query.tagId
  const loading = ref(false)
  const contentEditor = ref('')
  const modelVisible = ref(false)
  const lastForm = ref({
    cover: '',
    summary: '',
  })
  const coverFileList = ref([])
  const isNew = ref(-1)
  const handleRemove = (file) => {
    const deletedFile = toRaw(file)
    const { name } = deletedFile
    deleteFile(name).then((res) => {
      console.log(res)
      message.success('封面移除成功')
    })
  }
  const handleUploadChange = (res) => {
    if (res.file.status == 'done') {
      const { result } = res.file.response
      lastForm.value.cover = result
      message.success('封面上传成功')
    }
  }
  const init = () => {
    isNew.value = route.query.isNew
    if (isNew.value == 1) {
      contentEditor.value.setValue('Begin your Note!!')
      return
    } else {
      loading.value = true
      const query = route.query
      Object.keys(query).forEach((key) => {
        if (articleInfo.value.hasOwnProperty(key)) {
          articleInfo.value[key] = query[key]
        }
      })
      getArticleDetail(articleId)
        .then((res) => {
          console.log('res: ', res)
          if (typeof res === 'boolean') {
            message.error('服务器异常, 未获取到文章内容!')
            loading.value = false
            return
          }
          const { content } = res
          contentEditor.value.setValue(content)
        })
        .finally(() => {
          loading.value = false
        })
    }
  }
  const getMDContnt = () => {
    articleInfo.value.content = contentEditor.value.getValue()
    console.log('md内容是: ', articleInfo.value.content)
  }
  const onCancel = () => {
    modelVisible.value = false
  }
  const handleSubmit = () => {
    if (lastForm.value.cover === '') {
      message.warning('文章需要封面')
      return
    } else if (lastForm.value.summary === '') {
      message.warning('请填写文章简介')
      return
    }

    if (isNew.value === '1') {
      addArticle({
        nickname: formState.value.nickname,
        avatar: formState.value.avatar,
        homePath: formState.value.homePath,
        introduce: formState.value.introduce,
      })
    } else {
      updateArticle()
    }
  }
  const onSubmitSuccess = () => {
    message.success(`文章${isNew ? '发布' : '更新'}成功`)
    onCancel()
    loadList()
  }
  const onSubmitFailed = () => {
    message.error('遇到错误, 提交失败')
  }
  const publish = () => {
    if (articleInfo.value.title) {
      message.warning('标题不可以为空')
      return
    } else if (!articleInfo.value.content) {
      message.warning('还没有写内容哦')
      return
    }
    modelVisible.value = true
  }
  onMounted(() => {
    contentEditor.value = new Vditor('vditor', {
      ...mdEditorOpts,
      after: () => {
        init()
      },
    })
  })
</script>
<style scoped>
  a {
    color: #42b983;
  }
</style>
