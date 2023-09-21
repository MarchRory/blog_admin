<script setup lang="ts">
  import { ref } from 'vue'
  const keywords: String = ref('')
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="bar h-1/9 bg-gray-50 flex items-center">
      <div class="w-3/10 flex items-center">
        <span class="w-20">专栏名称:&nbsp; </span>
        <a-input class="rounded-xl" v-model:value="keywords" placeholder="查询你的专栏" />
      </div>
    </div>
    <div class="bar h-13/15 bg-gray-50"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    width: 98%;
    margin: 0 auto;
    padding: 12px 10px 6px;
    border-radius: 2px;
  }
</style>
