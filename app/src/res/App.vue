<template>
  <n-card>
    <n-tabs type="segment">
      <n-tab-pane name="响应体" tab="响应体">
        <Editor/>
      </n-tab-pane>
      <n-tab-pane name="响应头" tab="响应头">
        <Editor type="resHeaders"/>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
import Editor from '../components/Editor.vue';

import { useMockStore } from '../stores'

const store = useMockStore()
window.onload = () => {
  window.whistleBridge.addSessionCompleteListener(function (item: any) {
    store.init(item)
  });
};
</script>
<style lang="less" scoped></style>
