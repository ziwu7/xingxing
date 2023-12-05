import React, { FC, useEffect, useState } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
enum TAB_KEYS {
  PROP_KEY = "prop",
  SETTING_KEY = "setting",
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY);
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);
  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: (
        <div>
          <PageSetting />
        </div>
      ),
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems} />;
};

export default RightPanel;
