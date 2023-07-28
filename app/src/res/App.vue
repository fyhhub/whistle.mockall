<template>
  <n-tabs animated placement="left" type="card" v-model:value="tabIndex">
    <n-tab-pane name="Request" tab="Request">
        <n-tabs>
          <n-tab-pane name="请求体" tab="请求体" display-directive="show" style="padding-top: 16px;">
            <n-card>
              <Editor type="reqBody"/>
            </n-card>
          </n-tab-pane>
          <n-tab-pane name="请求头" tab="请求头" display-directive="show" style="padding-top: 16px;">
            <n-card>
              <Editor type="reqHeaders"/>
            </n-card>
          </n-tab-pane>
        </n-tabs>
    </n-tab-pane>
    <n-tab-pane name="Response" tab="Response">
        <n-tabs>
          <n-tab-pane name="响应体" tab="响应体" display-directive="show" style="padding-top: 16px;">
            <n-card>
              <Editor />
            </n-card>
          </n-tab-pane>
          <n-tab-pane name="响应头" tab="响应头" display-directive="show" style="padding-top: 16px;">
            <n-card>
              <Editor type="resHeaders"/>
            </n-card>
          </n-tab-pane>
        </n-tabs>
    </n-tab-pane>
    <n-tab-pane name="Mock记录" tab="Mock记录"> <MockList/> </n-tab-pane>
  </n-tabs>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import Editor from "../components/Editor.vue";
import MockList from "../components/MockList.vue";

import { useMockStore } from "../stores";

const store = useMockStore();
const { tabIndex } = storeToRefs(store)
window.onload = () => {
  window.whistleBridge.addSessionCompleteListener(function (item: any) {
    item && store.init(item);
  });
};
</script>
<style lang="less" scoped></style>
