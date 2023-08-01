<template>
  <div class="editor">
    <n-input
      class="editor__input"
      v-model:value="internalCode"
      @update:value="handleInput"
      type="textarea"
      style="height: 100%"
      placeholder="Empty"
    />
  </div>
</template>
<script setup lang="ts">
import { useMockStore } from "../stores/index";
import { storeToRefs } from "pinia";
import { setMock } from "../common/api";
import { useMessage } from 'naive-ui'
const message = useMessage()
const props = defineProps({
  mockKey: {
    type: String,
    default: "resBody",
  },
});
const internalCode = ref("");
const store = useMockStore();
const { mockData, selectedData, url, mockSwitch, fileType } =
  storeToRefs(store);
const collectSetMock: Ref<Record<string, any>> = inject("collectSetMock")!;

const realUrl = computed(() => {
  let u = url.value;
  // TODO change
  if (props.mockKey === 'sourcemapMapping') {
    u = 'global'
  }
  return u
})

const setMockFn = (isMock: boolean = true) => {
  setMock(realUrl.value, props.mockKey, isMock ? internalCode.value : "empty");
};

collectSetMock.value[props.mockKey] = setMockFn;

watch(
  () => [mockData.value, selectedData.value],
  () => {
    if (!selectedData.value && !mockData.value) return "";
    if (mockData.value?.[realUrl.value]?.[props.mockKey]) {
      internalCode.value = mockData.value[realUrl.value]?.[props.mockKey] || "";
      mockSwitch.value[realUrl.value] = {
        ...(mockSwitch.value[realUrl.value] || {}),
        [props.mockKey]: true,
      };

      internalCode.value = validJson();
      return;
    }
    if (selectedData.value) {
      internalCode.value = selectedData.value[props.mockKey];
      mockSwitch.value[realUrl.value] = {
        ...(mockSwitch.value[realUrl.value] || {}),
        [props.mockKey]: false,
      };
      internalCode.value = validJson();
      return;
    }
  },
  { immediate: true, deep: true }
);

const handleInput = () => {
  try {
    validJson()
    mockSwitch.value[realUrl.value] = {
      ...(mockSwitch.value[realUrl.value] || {}),
      [props.mockKey]: true,
    };
    setMockFn();
  } catch (e) {
  }
};

const validJson = () => {
  // TODO change
  if (
    props.mockKey === 'sourcemapMapping' ||
    props.mockKey === 'reqHeaders' ||
    props.mockKey === 'resHeaders' ||
    (fileType.value === 'json' && props.mockKey === 'resBody')
  ) {
    try {
      return JSON.stringify(JSON.parse(internalCode.value), null, 2)
    } catch(e) {
      message.error('格式化错误，请检测JSON格式')
    }
  }
  return internalCode.value;
};
</script>
<style lang="less" scoped>
.editor {
  position: relative;
  height: 100%;
  &__switch {
    position: sticky;
    margin-bottom: 16px;
  }
  &__input {
    border: none;
    border-radius: 0;
    font-size: 12px;
    :deep(.n-input__border) {
      display: none;
    }
    :deep(.n-input__state-border) {
      display: none;
    }
  }
  &__tool {
    position: absolute;
    right: 16px;
    top: 16px;
    z-index: 1;
  }
}
</style>
