import React, { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./StatHeader.module.scss";
import {
  Space,
  Button,
  Typography,
  Input,
  Tooltip,
  Popover,
  message,
} from "antd";
import type { InputRef } from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import Qrcode from "qrcode.react";

const { Title } = Typography;
const StatHeader: FC = () => {
  const { title, isPublished } = useGetPageInfo();
  const { _id } = useParams();
  const nav = useNavigate();
  const urlInputRef = useRef<InputRef>(null);
  //拷贝链接
  function copy() {
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); //选中元素input的内容
    document.execCommand("copy"); //执行复制，有横线是该功能快取消了
    message.success("复制成功！");
  }
  function genLinkAndQrcodeElem() {
    if (!isPublished) return null;
    const url = `http://localhost:3000/question/${_id}`;

    //定义二维码
    const QrCodeElem = (
      <div style={{ textAlign: "center" }}>
        <Qrcode value={url} size={150} />
      </div>
    );
    return (
      <Space>
        <Input value={url} ref={urlInputRef} />
        <Tooltip title="复制Url">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={QrCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title style={{ fontSize: "20px" }}>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQrcodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${_id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
