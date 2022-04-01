<template>

  <router-link to="/">主页</router-link>

  <hr>

  <router-link to="/test">测试首页→</router-link>
  |
  <router-link to="/test/client">客户端→</router-link>
  |
  <router-link to="/test/server">Server→</router-link>
  <router-view></router-view>

  <hr/>

  <n-space vertical style="padding: 16px; max-width: 360px">
    <n-button>Naive UI SSR</n-button>
    <n-cascader :options="cascaderOptions"/>
    <n-select :options="selectOptions"/>
    <n-input-number/>
  </n-space>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import {
  NButton,
  NSpace,
  NInputNumber,
  NCascader,
  NSelect
} from 'naive-ui'

export default defineComponent({
  components: {
    NButton,
    NInputNumber,
    NCascader,
    NSelect
  },
  setup(props, context) {
    return {
      cascaderOptions: [
        {
          label: '0',
          value: '0',
          children: [
            {
              label: '0-0',
              value: '0-0',
            },
            {
              label: '0-1',
              value: '0-1',
            }
          ]
        }
      ],
      selectOptions: [
        {
          label: '0',
          value: '0',
        },
        {
          label: '1',
          value: '1',
        }
      ]
    };
  },
});
</script>
<style lang="scss"></style>
