<template>
  <h3>接口测试</h3>
  Server-data：{{ data }}
</template>


<script lang="ts">
import {defineComponent} from "vue";
import {Store, useStore} from "vuex";
import {AsyncDataParam, key, State} from "@/stores/init";

export default defineComponent({
  async asyncData({store, route}: AsyncDataParam) {
    return store.dispatch("ASYNC_SERVER");
  },
  setup(props, context) {
    const {testData: data} = useStore<State>(key).state;

    return {
      data,
      // ...toRefs()
    };
  },
});
</script>
<style lang="scss"></style>
