<script setup lang="ts">
import DefaultLayout from "@/layout/DefaultLayout.vue"
import {NConfigProvider, NMessageProvider} from 'naive-ui'
import type {GlobalThemeOverrides} from 'naive-ui'
import {zhCN, dateZhCN} from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    // primaryColor: '#FF0000'
  },
  Button: {
    fontSizeLarge: '16px'
  }
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <DefaultLayout>
        <router-view></router-view>
      </DefaultLayout>
    </n-message-provider>
  </n-config-provider>

</template>

<style scoped></style>
