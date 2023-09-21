<script setup lang="ts">
  import { ref } from 'vue'
  const keywords: String = ref('')
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="bar h-1/9 flex items-center" style="background-color: white">
      <div class="w-1/4 flex items-center">
        <span class="w-20">专栏名称:&nbsp; </span>
        <a-input v-model:value="keywords" placeholder="查询你的专栏" />
      </div>
    </div>
    <div class="bar h-13/15" style="background-color: white"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    width: 98%;
    margin: 0 auto;
    padding: 12px 20px 6px;
    border-radius: 2px;
  }
</style>
