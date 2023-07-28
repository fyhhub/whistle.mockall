import { defineStore } from 'pinia'
import { request } from '../common/request';
import { decode } from 'js-base64';
export const useMockStore = defineStore('user', () => {

  const mockData = ref<any>();

  const selected = ref<any>({})

  const getMockStatus = (type: string) => {
    if (mockData.value?.[type]) {
      return true;
    }
    return false;
  }

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
  const reqHeaders = computed(() => {
    let reqHeaders = selected.value.reqHeaders;
    if (mockData.value && Object.keys(mockData.value).length) {
      reqHeaders = mockData.value.reqHeaders || reqHeaders
    }
    return reqHeaders;
  })
  const reqBody = computed(() => {
    let reqBody = selected.value.reqBody;
    if (mockData.value && Object.keys(mockData.value).length) {
      reqBody = mockData.value.reqBody || reqBody
    }
    return reqBody;
  })
  const tabIndex = ref('Response');
  const url = ref()
  const type = ref();
  const list = shallowRef();
  const fileType = computed(() => {
    if (!type.value) {
      return 'text'
    }
    if (type.value.includes('json')) {
      return 'json';
    }
    if (type.value.includes('html')) {
      return 'html'
    }
    if (type.value.includes('text')) {
      return 'text'
    }
    if (type.value.includes('javascript')) {
      return 'javascript'
    }
    if (type.value.includes('image')) {
      return 'image'
    }
    if (type.value.includes('font')) {
      return 'font'
    }
    return 'text'
  })
  const initMock = async (item?: any) => {
    const res: any = await request({
      url: 'whistle.mockall/cgi-bin/mock/get',
      type: 'get',
      mode: 'cancel'
    })
    list.value = res.data || {};
    mockData.value = res.data?.[item?.url] || {};
    console.log("%c Line:27 🍕 mockData.value", "color:#ed9ec7", mockData.value);
  }

  const initSelected = (item: any) => {
    const bodyStr = item.res.base64 ? decode(item.res.base64) : '';
    const reqBodyStr = item.req.base64 ? decode(item.req.base64) : '';
    selected.value = {
      resHeaders: JSON.stringify(item.res.headers, null, 2),
      resBody: bodyStr,
      reqHeaders: JSON.stringify(item.req.headers, null, 2),
      reqBody: reqBodyStr
    }
    type.value = item.type;
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
    list,
    init,
    initMock,
    initSelected,
    resBody,
    resHeaders,
    url,
    fileType,
    getMockStatus,
    reqBody,
    reqHeaders,
    tabIndex
  }
})
