<script setup lang="ts">
  import { ref } from 'vue'
  const list = ref([])
  const keywords = ref('')
  const search = () => {}
</script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-row justify-between">
    <div
      class="bar h-1/1 w-5/28 flex items-center flex-col px-2 justify-between py-4"
      style="background-color: rgb(255, 255, 255)"
    >
      <p class="text-lg font-bold w-1/1">专栏</p>
      <div class="w-1/1 h-12 flex items-center justify-between">
        <a-input size="default" v-model:value="keywords" placeholder="查询你的专栏" />
        <div class="flex w-12">
          <a-button size="small" class="mr-4" @click="keywords = ''">重置</a-button>
          <a-button size="small" type="primary" @click="search">搜索</a-button>
        </div>
      </div>

      <div class="w-1/1 h-14/15 bg-emerald-400"> </div>
    </div>

    <div class="bar h-1/1 w-22/28" style="background-color: white"></div>
  </div>
</template>

<style scoped lang="less">
  .bar {
    margin: 0 auto;
    border-radius: 2px;
  }
</style>
