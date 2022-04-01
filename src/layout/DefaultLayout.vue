<script setup lang="ts">
import {useMessage} from "naive-ui";

const message = useMessage();
</script>

<template>
  <div style="height: 100vh;position: relative">
    <n-layout position="absolute" :native-scrollbar="false">

      <n-layout-header style="height: 80px; padding: 20px 30px" bordered>
        <n-space>
          <n-button @click="() => message.error('666666666')">点我弹框</n-button>
          <router-link to="/test">SSR测试</router-link>
        </n-space>
      </n-layout-header>

      <n-layout position="absolute" style="top: 80px;" :native-scrollbar="false">
        <n-layout content-style="padding: 24px;">
          <slot/>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>


<style scoped>

</style>