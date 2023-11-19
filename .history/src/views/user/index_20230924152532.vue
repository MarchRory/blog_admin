<script setup lang="ts">
  import { ref } from 'vue'
  const userInfo = ref({
    username: '',
    password: '',
    nickname: '',
    homePath: '',
    avatar: '',
    introduce: '',
  })
  const contact = ref({
    userId: '',
    github: '',
    gitee: '',
    csdn: '',
    juejin: '',
    email: '',
    qq: '',
    vx: '',
  })
  const handleUserInfoSubmit = () => {}
  const onUserInfoSubmitSuccess = () => {}
  const onUserInfoSubmitFailed = () => {}
</script>

<template>
  <div class="p-4 h-1/1 w-1/1 flex md:flex enter-y flex-col justify-between">
    <div class="w-1/1 h-3/10 flex items-center justify-center">
      <div class="h-33 w-33 rounded-full overflow-hidden duration-200 hover:shadow-2xl">
        <img
          class="object-cover h-1/1 w-1/1"
          src="https://blog-avatar-1321070494.cos.ap-guangzhou.myqcloud.com/yu_hao_tian.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="w-1/1 h-11/16 flex flex-row justify-between">
      <div class="h-1/1 w-39/80 bg-neutral-200 p-6">
        <a-form
          :labelCol="{ span: 8 }"
          :wrapperCol="{ span: 16 }"
          @submit="handleUserInfoSubmit"
          @finish="onUserInfoSubmitSuccess"
          @finishFailed="onUserInfoSubmitFailed"
        >
          <a-form-item
            name="nickname"
            label="博主网名"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-input
              type="text"
              v-model:value="userInfo.nickname"
              style="width: 80%"
              placeholder="网名也可以, 字词实名冲浪"
            />
          </a-form-item>
          <a-form-item
            name="username"
            label="账号"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-input
              type="text"
              v-model:value="userInfo.username"
              style="width: 80%"
              placeholder="请设置账号"
            />
          </a-form-item>
          <a-form-item
            name="password"
            label="密码"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-input
              type="text"
              v-model:value="userInfo.password"
              style="width: 80%"
              placeholder="请设置密码"
            />
          </a-form-item>
          <a-form-item
            name="homePath"
            label="博客地址"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-input
              type="text"
              v-model:value="userInfo.homePath"
              style="width: 80%"
              placeholder="设置你的博客前台地址"
            />
          </a-form-item>
          <a-form-item
            name="contact"
            label="简介"
            :rules="[{ required: true, message: '此处不能为空' }]"
          >
            <a-textarea
              type="text"
              v-model:value="userInfo.introduce"
              style="width: 80%"
              show-count
              autoSize
              :maxlength="100"
              placeholder="写点东西介绍下自己"
            />
          </a-form-item>
        </a-form>
      </div>
      <div class="h-1/1 w-39/80 bg-sky-400"></div>
    </div>
  </div>
</template>
