<template>
  <n-card>
    <n-alert title="注意" type="warning">
      查看按钮仅支持查看Mock的部分
    </n-alert>
  </n-card>
  <n-list bordered show-divider>
    <n-list-item v-for="(_item, key) in mockData">
      <template #suffix>
        <n-space vertical>
          <n-button
            quaternary
            type="info"
            size="tiny"
            @click="handleView(key as any)"
          >
            查看
          </n-button>
          <n-button
            quaternary
            type="error"
            size="tiny"
            v-if="key as any !== 'global'"
            @click="handleDelete(key as any)"
          >
            删除
          </n-button>
        </n-space>
      </template>
      <span>{{ key }}</span>
    </n-list-item>
  </n-list>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMockStore } from "../../stores";
import { deleteMock } from "../../common/api";

const store = useMockStore();
const { mockData } = storeToRefs(store);

onMounted(() => {
  store.getMock();
});

const handleDelete = (key: string) => {
  deleteMock(key);
  store.getMock();
};

const handleView = (key: string) => {
  store.getSelected({ url: key }, false);
  store.getMock();
};
</script>
<style lang="less" scoped></style>
