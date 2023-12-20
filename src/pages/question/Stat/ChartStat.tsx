import React, { FC, useEffect, useState } from "react";
import { getComponentStatService } from "../../../services/stat";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { getComponentConfByType } from "../../../components/QuestionComponents/";

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};
const { Title } = Typography;
const ChartStat: FC<PropsType> = (props) => {
  const { selectedComponentId, selectedComponentType } = props;

  const { _id = "" } = useParams();
  const [stat, SetStat] = useState([]);
  const { run } = useRequest(
    async (questionId, componentId) => {
      return await getComponentStatService(questionId, componentId);
    },
    {
      manual: true,
      onSuccess: (res) => {
        SetStat(res.stat);
      },
    },
  );
  useEffect(() => {
    if (selectedComponentId) run(_id, selectedComponentId);
  }, [_id, selectedComponentId]);

  function genStatElem() {
    if (!selectedComponentId) return <div>没选中组件</div>;
    const { StatComponent } =
      getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) return <div>没找到组件</div>;

    return <StatComponent stat={stat} />;
  }

  return (
    <div>
      <Title level={3}>图表统计</Title>
      <div>{genStatElem()}</div>
    </div>
  );
};

export default ChartStat;
