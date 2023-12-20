import React, { FC, PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { QuestionRadioStatPropsType } from "./interface";
import { Button, Input } from "antd";
import { STAT_COLORS } from "../../../constant";
//

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  return (
    //用了ResponsiveContainer就无法显示饼图，不知为啥
    // <ResponsiveContainer width="100%" height="100%">

    <PieChart width={300} height={400}>
      <Pie
        data={stat}
        dataKey="count"
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
        label={(i) => `${i.name}:${i.count}`}
      />
    </PieChart>
    // </ResponsiveContainer>
  );
};

export default StatComponent;
