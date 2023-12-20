import axios, { ResDataType } from "./ajax";

//获取单个问卷的分析页收集的答卷数据，
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `https://mock.apifox.com/m1/3240899-0-default/stat/${questionId}`;

  const data = (await axios.get(url, { params: opt })) as ResDataType;
  console.log(data);

  return data;
}

//获取组件统计数据汇总
export async function getComponentStatService(
  questionId: string,
  componentId: string,
): Promise<ResDataType> {
  const url = `	https://mock.apifox.com/m1/3240899-0-default/stat/${questionId}/${componentId}`;

  const data = (await axios.get(url)) as ResDataType;
  return data;
}
