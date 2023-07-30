<template>
  <div class="editor">
    <n-input
      class="editor__input"
      v-model:value="internalCode"
      @update:value="handleInput"
      type="textarea"
      style="height: 100%;"
      placeholder="Empty"
    />
  </div>
</template>
<script setup lang="ts">
import { useMockStore } from '../stores/index';
import { storeToRefs } from 'pinia';
import { setMock } from '../common/api';
const props = defineProps({
  mockKey: {
    type: String,
    default: 'resBody'
  }
})
const internalCode = ref('')
const store = useMockStore()
const { mockData, selectedData, url, mockSwitch } = storeToRefs(store)

const collectSetMock: Ref<Record<string, any>> = inject('collectSetMock')!;

const setMockFn = (isMock: boolean = true) => {
  url.value && setMock(url.value, props.mockKey, isMock ? internalCode.value : 'empty');
}

collectSetMock.value[props.mockKey] = setMockFn;

watch(() => [mockData.value, selectedData.value], () => {
  if (!selectedData.value && !mockData.value) return ''
  if (mockData.value?.[url.value]?.[props.mockKey]) {
    internalCode.value = mockData.value[url.value]?.[props.mockKey] || '';
    mockSwitch.value[url.value] = {
      ...(mockSwitch.value[url.value] || {}),
      [props.mockKey]: true
    }
    return
  }
  if (selectedData.value) {
    internalCode.value = selectedData.value[props.mockKey]
    mockSwitch.value[url.value] = {
      ...(mockSwitch.value[url.value] || {}),
      [props.mockKey]: false
    }
    return;
  }

}, { immediate: true })

const handleInput = () => {
  mockSwitch.value[url.value] = {
    ...(mockSwitch.value[url.value] || {}),
    [props.mockKey]: true
  }
  setMockFn();
}


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
