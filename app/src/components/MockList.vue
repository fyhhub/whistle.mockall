<template>
  <n-card>
    <n-list>
      <n-list-item v-for="(_item, key) in list" :key="key">
        <span>{{ key }}</span>
        <template #suffix>
          <n-space vertical>
            <n-button quaternary type="info" @click="handleView(key as any)">
              查看
            </n-button>
            <n-button quaternary type="error" @click="handleDelete(key as any)">
              删除
            </n-button>
          </n-space>
        </template>
      </n-list-item>
    </n-list>
  </n-card>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMockStore } from "../stores/index";
import { request } from "../common/request";
const store = useMockStore();
const { list, url, tabIndex } = storeToRefs(store);
onMounted(() => {
  store.initMock({url: url.value});
})
const handleView = (key: string) => {
  console.log("%c Line:30 🌶 key", "color:#93c0a4", key);
  store.initMock({ url: key });
  tabIndex.value = 'Response';
};

const handleDelete = async (key: string) => {
  await request(
    {
      url: "whistle.mockall/cgi-bin/mock/delete",
      type: "post",
      mode: "cancel",
    },
    {
      url: key,
    }
  );
  if (url.value === key) {
    store.initMock({ url: key });
  } else {
    store.initMock();
  }
};
</script>
<style lang="less" scoped></style>
