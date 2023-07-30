import { defineStore } from 'pinia'
import { request } from '../common/request';
import { decode } from 'js-base64';
export const useMockStore = defineStore('user', () => {

  const mockData = ref();

  const selectedData = ref()
  const mockSwitch = ref({} as Record<string, any>)
  const url = ref()
  const type = ref();
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

  const isMock = (mockKey: string) => {
    if (!mockData.value) return false;

    if (!mockData.value[url.value]) return false;

    return !!mockData.value[url.value][mockKey]
  }

  const getMock = async () => {
    const res: any = await request({
      url: 'whistle.mockall/cgi-bin/mock/get',
      type: 'get',
      mode: 'cancel'
    })
    mockData.value = res.data;
  }

  const getSelected = (item: any, isInit = true) => {
    url.value = item.url;
    if (!isInit) {
      selectedData.value = {
        resHeaders: '',
        resBody: '',
        reqHeaders: '',
        reqBody: '',
        statusCode: ''
      }
      return;
    }
    type.value = item.type;
    const bodyStr = item.res.base64 ? decode(item.res.base64) : '';
    const reqBodyStr = item.req.base64 ? fileType.value !== 'image'?  decode(item.req.base64) : item.req.base64 : '';
    selectedData.value = {
      resHeaders: JSON.stringify(item.res.headers, null, 2),
      resBody: bodyStr,
      reqHeaders: JSON.stringify(item.req.headers, null, 2),
      reqBody: reqBodyStr,
      statusCode: item.res.statusCode
    }
  }

  const init = (item: any) => {
    getSelected(item)
    getMock()
  }

  return {
    getMock,
    getSelected,
    init,
    mockData,
    selectedData,
    isMock,
    url,
    fileType,
    mockSwitch
  }
})
