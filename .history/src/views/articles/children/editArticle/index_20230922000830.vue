<template>
  <div>
    <div> </div>
    <div id="vditor"></div>
  </div>
</template>
<script>
  export default defineComponent({
    // 需要和路由的name一致
    name: 'editArticle',
  })
</script>
<script setup>
  import { defineProps, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { articleItemModel } from '/@/api/sys/model/articleModel'
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
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
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
