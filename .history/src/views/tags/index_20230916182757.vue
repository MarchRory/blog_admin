<script setup lang="ts">
  import { ref } from 'vue'
  const list = ref([])
  const keywords: String = ref('')
  const search = () => {}
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
    <div class="bar h-13/15 flex flex-col justify-between" style="background-color: white">
      <div class>
        <div>专栏列表</div>
      </div>
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
