<template>
  <!-- <LiteJsonEditor v-model="body"/> -->
  <n-card>
    <n-tabs type="segment">
      <n-tab-pane name="响应体" tab="响应体">
        <n-switch :round="false" v-model:value="isMockBody"/>
        <CodeEditor :languages="[['json', 'json']]" :wrap="true" font-size="12px" :line-nums="false" v-model="resBody" theme="github"></CodeEditor>
      </n-tab-pane>
      <n-tab-pane name="响应头" tab="响应头">
        <n-switch :round="false" v-model:value="isMockHeaders"/>
        <CodeEditor :languages="[['json', 'json']]" :wrap="true" font-size="12px" :line-nums="false" v-model="resHeaders" theme="github"></CodeEditor>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup lang="ts">
// import LiteJsonEditor from "lite-json-editor";
import { decode } from "js-base64";
import { request } from '../common/request';
// @ts-ignore
import CodeEditor from 'simple-code-editor';

const resBody = ref();
const resHeaders = ref();
const url = ref()

const mockData = shallowRef()
const isMockHeaders = ref();
const isMockBody = ref();

const formData = computed(() => {
  return {
    resHeaders: typeof resHeaders.value === 'string' ? JSON.parse(resHeaders.value) : resHeaders.value,
    resBody: typeof resBody.value === 'string' ? JSON.parse(resBody.value) : resBody.value,
    url: url.value
  }
})
window.onload = () => {
  window.whistleBridge.addSessionCompleteListener(function (item: any) {
    console.log("%c Line:37 🍭 item", "color:#ea7e5c", item);
    resHeaders.value = JSON.stringify(item.res.headers);
    resBody.value = decode(item.res.base64);
    url.value = item.url;
    getList();
  });
};

const getList = async () => {
  const res: any = await request({
    url: 'whistle.mockall/cgi-bin/mock/get',
    type: 'get',
    mode: 'cancel'
  })
  console.log("%c Line:56 🥪 res", "color:#465975", res);
  mockData.value = res.data;
  console.log("%c Line:61 🎂 resHeaders.value", "color:#e41a6a", resHeaders.value);
  if (mockData.value[url.value]) {
    resHeaders.value = JSON.stringify(mockData.value[url.value].resHeaders) || resHeaders.value;
    resBody.value = JSON.stringify(mockData.value[url.value].resBody) || resBody.value;
    isMockHeaders.value = !!mockData.value[url.value].resHeaders;
    isMockBody.value = !!mockData.value[url.value].resBody;
  } else {
    isMockHeaders.value = false;
    isMockBody.value = false;
  }
}

watch(() => [isMockHeaders.value, isMockBody.value], async () => {
  request({
    url: 'whistle.mockall/cgi-bin/mock/set',
    type: 'post',
    mode: 'cancel'
  }, {
    url: url.value,
    resHeaders: isMockHeaders.value ? formData.value.resHeaders : null,
    resBody: isMockBody.value ? formData.value.resBody : null,
  })
})
</script>
<style lang="less" scoped></style>
