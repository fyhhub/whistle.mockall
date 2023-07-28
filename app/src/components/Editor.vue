<template>
  <div class="editor">
    <n-space align="center" class="editor__switch">
      <n-space>
        <span>Mock开关</span>
        <n-switch
          :round="false"
          v-model:value="isMock"
          @update:value="handleSwitchMock"
        >
        </n-switch>
      </n-space>
      <n-badge :dot="hasChanged" v-if="isMock">
        <n-button @click="setMock(true)">保存</n-button>
      </n-badge>
    </n-space>
    <n-input
      v-model:value="internalCode"
      @update:value="handleInput"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 20 }"
    />
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import CodeEditor from "simple-code-editor";
import { useMockStore } from "../stores/index";
import { storeToRefs } from "pinia";
import { PropType } from "vue";
import { request } from "../common/request";

const props = defineProps({
  type: {
    type: String as PropType<
      "resBody" | "resHeaders" | "reqBody" | "reqHeaders"
    >,
    default: "resBody",
  },
});
const isMock = ref();
const internalCode = ref("");
const hasChanged = ref(false);

const store = useMockStore();
const { resBody, resHeaders, url, fileType, reqBody, reqHeaders } =
  storeToRefs(store);

watch(
  () => [resBody.value, resHeaders.value, reqBody.value, reqHeaders.value],
  (val) => {
    if (!val) return;
    isMock.value = store.getMockStatus(props.type);
    if (props.type === "resBody") {
      let body = resBody.value;
      if (fileType.value === "json") {
        body = JSON.stringify(JSON.parse(body), null, 2);
      }
      internalCode.value = body;
      return;
    }

    if (props.type === "resHeaders") {
      internalCode.value = resHeaders.value;
      return;
    }

    if (props.type === "reqBody") {
      internalCode.value = reqBody.value;
      return;
    }

    if (props.type === "reqHeaders") {
      internalCode.value = reqHeaders.value;
      return;
    }
  },
  { immediate: true }
);

const setMock = async (isMock: boolean) => {
  const params: any = {
    url: url.value,
  };

  params[props.type] = isMock ? internalCode.value : "empty";
  await request(
    {
      url: "whistle.mockall/cgi-bin/mock/set",
      type: "post",
      mode: "cancel",
    },
    params
  );
  hasChanged.value = false;
};

const handleSwitchMock = (val: boolean) => {
  setMock(val);
};

const handleInput = () => {
  hasChanged.value = true;
};
</script>
<style lang="less" scoped>
.editor {
  position: relative;
  &__switch {
    position: sticky;
    margin-bottom: 16px;
  }
}
</style>
