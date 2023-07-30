<template>
  <div class="mock">
    <VueSplitView direction="vertical" a-init="300px">
      <template #A>
        <n-tabs type="line" animated>
          <template #suffix>
            <n-button quaternary size="tiny" type="info" @click="showDrawer = true">
              Mock Records
            </n-button>
          </template>
          <n-tab-pane name="reqHeaders" tab="Request Headers" display-directive="show">
            <Editor mock-key="reqHeaders"/>
            <template #tab>
              <n-space>
                <span>Request Headers</span>
                <n-switch size="small" :value="mockSwitch[url]?.['reqHeaders']" @update:value="handleSwitch('reqHeaders', $event)"/>
              </n-space>
            </template>
          </n-tab-pane>
          <n-tab-pane name="reqBody" tab="Request Body" display-directive="show">
            <template #tab>
              <n-space>
                <span>Request Body</span>
                <n-switch size="small" :value="mockSwitch[url]?.['reqBody']" @update:value="handleSwitch('reqBody', $event)"/>
              </n-space>
            </template>
            <Editor mock-key="reqBody"/>
          </n-tab-pane>
        </n-tabs>
      </template>
      <template #B>
        <n-tabs type="line" animated>
          <n-tab-pane name="resHeaders" tab="Response Headers" display-directive="show">
            <template #tab>
              <n-space>
                <span>Response Headers</span>
                <n-switch size="small" :value="mockSwitch[url]?.['resHeaders']" @update:value="handleSwitch('resHeaders', $event)"/>
              </n-space>
            </template>
            <Editor mock-key="resHeaders" />
          </n-tab-pane>
          <n-tab-pane name="resBody" tab="Response Body" display-directive="show">
            <template #tab>
              <n-space>
                <span>Response Body</span>
                <n-switch size="small" :value="mockSwitch[url]?.['resBody']" @update:value="handleSwitch('resBody', $event)"/>
              </n-space>
            </template>
            <Editor mock-key="resBody" />
          </n-tab-pane>
          <n-tab-pane name="statusCode" tab="Status Code" display-directive="show">
            <template #tab>
              <n-space>
                <span>Status Code</span>
                <n-switch size="small" :value="mockSwitch[url]?.['statusCode']" @update:value="handleSwitch('statusCode', $event)"/>
              </n-space>
            </template>
            <Editor mock-key="statusCode" />
          </n-tab-pane>
        </n-tabs>
      </template>
    </VueSplitView>
  </div>
  <n-drawer v-model:show="showDrawer" :width="400" placement="right">
    <MockList/>
  </n-drawer>
</template>
<script setup lang="ts">
import VueSplitView from "vue-split-view";
import Editor from "../../components/Editor.vue";
import { useMockStore } from "../../stores";
import { storeToRefs } from "pinia";
import MockList from "./MockList.vue";
const store = useMockStore();
const { mockSwitch, url } = storeToRefs(store);
const collectSetMock = ref({} as any)
const showDrawer = ref(false)
provide('collectSetMock', collectSetMock)


const handleSwitch = (type: string, val: boolean) => {
  mockSwitch.value[url.value] = {
    ...(mockSwitch.value[url.value] || {}),
    [type]: val,
  }
  collectSetMock.value[type](val)
}
window.onload = () => {
  window.whistleBridge.addSessionActiveListener(function (item: any) {
    console.log("%c Line:81 🍭 item", "color:#ea7e5c", item);
    item && store.init(item);
  });

};
</script>
<style lang="less" scoped>
.mock {
  padding: 16px;
  padding-top: 0;
  :deep(.n-tabs) {
    height: 100%;
  }
  :deep(.n-tabs-pane-wrapper) {
    height: 100%;
  }
}
</style>
