<script setup lang="ts"></script>

<template>
  <div class="p-4 h-1/1 flex md:flex enter-y flex-col">
    <div class="bar h-1/8 bg-red-100"> </div>
    <div class="bar flex-auto bg-slate-400"></div>
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
