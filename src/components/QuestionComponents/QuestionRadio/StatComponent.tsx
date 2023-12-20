import React, { FC, useMemo } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { QuestionRadioStatPropsType } from "./interface";

function format(value: number) {
  return (value * 100).toFixed(2) + "%";
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat }) => {
  const sum = useMemo(() => {
    let s = 0;
    stat.forEach((i) => (s += i.count));
    return s;
  }, [stat]);
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
        label={(i) => `${i.name}:${format(i.count / sum)}`}
      />
    </PieChart>
    // </ResponsiveContainer>
  );
};

export default StatComponent;
