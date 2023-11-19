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
          <a-button class="mr-4" size="large"> 重置 </a-button>
          <a-button type="primary" size="large">发布</a-button>
        </div>
      </div>
      <div id="vditor"></div>
    </div>
  </a-spin>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    // 需要和路由的name一致
    name: 'editArticle',
  })
</script>
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getArticleDetail } from '/@/api/sys/article'
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  import { mdEditorOpts } from '/@/utils/markdown/index'
  const route = useRoute()
  const articleInfo = ref({
    title: '',
    tagId: '',
    cover: '',
    articleContent: '',
    publishTime: '',
    updateTime: '',
    summary: '',
  })
  const loading = ref(false)
  const contentEditor = ref('')
  const tagId = ref('')
  const init = () => {
    const { isNew } = route.query
    if (isNew === 0) {
      return
    } else {
      loading.value = true
      tagId.value = route.query.tagId
      getArticleDetail(tagId)
        .then((res) => {
          console.log('res: ', res)
          const { content } = res
          contentEditor.value = content
        })
        .finally(() => {
          loading.value = false
        })
    }
  }
  const getMDContnt = () => {}
  onMounted(() => {
    contentEditor.value = new Vditor('vditor', {
      ...mdEditorOpts,
      after: () => {
        contentEditor.value.setValue('hello,Vditor+Vue!')
      },
    })
  })
  init()
</script>
<style scoped>
  a {
    color: #42b983;
  }
</style>
