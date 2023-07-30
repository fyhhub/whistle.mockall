import { request } from "./request";

export const setMock = async (url: string, key: string, val: string) => {
  const params: any = {
    url,
    mockKey: key,
    mockData: val
  };
  await request(
    {
      url: "whistle.mockall/cgi-bin/mock/set",
      type: "post",
      mode: "cancel",
    },
    params
  );
}


export const deleteMock = async (url: string) => {
  const params: any = {
    url
  };
  await request(
    {
      url: "whistle.mockall/cgi-bin/mock/delete",
      type: "post",
      mode: "cancel",
    },
    params
  );
}
