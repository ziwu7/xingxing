import React, { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: "Props",
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: "setting",
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <div>shezhi</div>,
    },
  ];
  return <Tabs defaultActiveKey="Props" items={tabsItems} />;
};

export default RightPanel;
