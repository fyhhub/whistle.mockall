import { defineStore } from 'pinia'
import { request } from '../common/request';
import { decode } from 'js-base64';
export const useMockStore = defineStore('user', () => {

  const mockData = ref<any>();

  const selected = ref<any>({})

  const resBody = computed(() => {
    let resBody = selected.value.resBody;
    if (mockData.value && Object.keys(mockData.value).length) {
      resBody = mockData.value.resBody || resBody
    }
    return resBody;
  })
  const resHeaders = computed(() => {
    let resHeaders = selected.value.resHeaders;
    if (mockData.value && Object.keys(mockData.value).length) {
      resHeaders = mockData.value.resHeaders || resHeaders
    }
    return resHeaders;
  })
  const url = ref()
  const initMock = async (item: any) => {
    const res: any = await request({
      url: 'whistle.mockall/cgi-bin/mock/get',
      type: 'get',
      mode: 'cancel'
    })
    mockData.value = res.data?.[item.url];
    console.log("%c Line:27 🍕 mockData.value", "color:#ed9ec7", mockData.value);
  }

  const initSelected = (item: any) => {
    const bodyStr = item.res.base64 ? decode(item.res.base64) : '';
    selected.value = {
      resHeaders: JSON.stringify(item.res.headers, null, 2),
      resBody: bodyStr,
    }
    url.value = item.url;
    console.log("%c Line:33 🍞 selected.value", "color:#3f7cff", selected.value);
  }

  const init = async (item: any) => {
    console.log("%c Line:43 🍢 item", "color:#7f2b82", item);
    initSelected(item)
    await initMock(item)
  }
  return {
    mockData,
    selected,
    init,
    initMock,
    initSelected,
    resBody,
    resHeaders,
    url
  }
})
