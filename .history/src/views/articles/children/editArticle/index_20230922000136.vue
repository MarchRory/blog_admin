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
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  const route = useRoute()

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
