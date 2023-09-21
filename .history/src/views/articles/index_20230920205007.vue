<script setup lang="ts">
  import { ref } from 'vue'
  const list = ref([])
  const keywords = ref('')
  const search = () => {}
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-row justify-between">
    <div
      class="bar h-15/15 w-2/10 flex items-center flex-col px-12 justify-between"
      style="background-color: rgb(224, 104, 104)"
    >
      <div class="w-1/4 flex items-center">
        <span class="w-2/7">专栏名称:&nbsp; </span>
        <a-input v-model:value="keywords" placeholder="查询你的专栏" />
      </div>
      <div>
        <a-button class="mr-4" @click="keywords = ''">重置</a-button>
        <a-button type="primary" @click="search">搜索</a-button>
      </div>
    </div>

    <div class="bar h-15/15 w-8/10" style="background-color: white"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    margin: 0 auto;
    border-radius: 2px;
  }
</style>
