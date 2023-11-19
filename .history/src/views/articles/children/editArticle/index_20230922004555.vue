<template>
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
  const contentEditor = ref('')
  onMounted(() => {
    contentEditor.value = new Vditor('vditor', {
      ...mdEditorOpts,
      after: () => {
        contentEditor.value.setValue('hello,Vditor+Vue!')
      },
    })
  })
</script>
<style scoped>
  a {
    color: #42b983;
  }
</style>
