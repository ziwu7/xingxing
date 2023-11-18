import axios, { ResDataType } from "./ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
  //isStared
  //isPubshed等扩展
};
//给单个问卷的编辑和数据分析页 question的edit和stat2个页面用返回id，title
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `https://mock.apifox.cn/m1/3240899-0-default/question/${id}`; //`http://127.0.0.1:4523/m1/3240899-0-default/question/${id}`; //
  console.log("getQuestionService", url);
  const data = (await axios.get(url)) as ResDataType;
  console.log(data);

  return data;
}

//新增一个问卷，返回id
export async function createQuestionService(): Promise<ResDataType> {
  const url = "https://mock.apifox.cn/m1/3240899-0-default/question";
  const data = (await axios.post(url)) as ResDataType;
  console.log(data);

  return data;
}

//list 页面加载数据列表返回[{},{}]
export async function getQuestionListService(
  opt: Partial<SearchOption> = {},
): Promise<ResDataType> {
  const url = "https://mock.apifox.cn/m1/3240899-0-default/question";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  console.log(data);

  return data;
}

//在问卷列表页，更新单个问卷的属性比如star状态，
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any },
): Promise<ResDataType> {
  const url = `https://mock.apifox.cn/m1/3240899-0-default/question/${id}`; //`http://127.0.0.1:4523/m1/3240899-0-default/question/${id}`; //
  console.log("updateQuestionService", url);
  const data = (await axios.patch(url, opt)) as ResDataType;
  console.log(data);

  return data;
}

//复制问卷，返回一个id
export async function duplicateQuestionService(id: string) {
  const url =
    "https://mock.apifox.cn/m1/3240899-0-default/question/duplicate/1";
  console.log("duplicateQuestionService", url);
  const data = (await axios.post(url, id)) as ResDataType;
  return data;
}

//永久删除
export async function deleteQuestionService(ids: string[]) {
  const url = "https://mock.apifox.cn/m1/3240899-0-default/question";
  console.log("duplicateQuestionService", url);
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}
