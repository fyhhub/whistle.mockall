<template>
  <n-switch :round="false" v-model:value="isMock"/>
  <CodeEditor
    :languages="[['javascript', 'javascript']]"
    :wrap="true"
    font-size="12px"
    :line-nums="false"
    v-model="internalCode"
    theme="github"
    style="width: 100%;"
  ></CodeEditor>
</template>
<script setup lang="ts">
// @ts-ignore
import CodeEditor from 'simple-code-editor';
import { useMockStore } from '../stores/index';
import { storeToRefs } from 'pinia';
import { PropType } from 'vue';
import { request } from '../common/request';

const props = defineProps({
  type: {
    type: String as PropType<'resBody' | 'resHeaders'>,
    default: 'resBody'
  }
})
const isMock = ref();
const internalCode = ref('');

const store = useMockStore()
const { resBody, resHeaders, url, mockData, selected } = storeToRefs(store)

watch(() => [mockData.value?.[props.type, selected.value[props.type]]], (val) => {
  if (!val) return;
  if (props.type === 'resBody') {
    internalCode.value = resBody.value;
  }
  if (props.type === 'resHeaders') {
    internalCode.value = resHeaders.value;
    console.log("%c Line:40 🥔 resHeaders", "color:#f5ce50", resHeaders);
  }
  isMock.value = !!mockData.value?.[props.type];
  console.log("%c Line:44 🍅 mockData.value", "color:#3f7cff", mockData.value);
  console.log("%c Line:43 🍕 props.type", "color:#3f7cff", props.type);
  console.log("%c Line:43 🍪 isMock.value", "color:#42b983", isMock.value);
}, { immediate: true })


watch(() => {
  return isMock.value
}, (val) => {
  const params: any = {
    url: url.value
  }

  params[props.type] = val ? internalCode.value : 'empty'
  request({
    url: 'whistle.mockall/cgi-bin/mock/set',
    type: 'post',
    mode: 'cancel'
  }, params)
})


</script>
<style lang="less" scoped>

</style>
