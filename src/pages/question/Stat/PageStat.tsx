import React, { FC, useState } from "react";
import { getQuestionStatListService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { Typography, Table, Spin, Empty, Pagination } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { STAT_PAGE_SIZE } from "../../../constant";
type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
const { Title } = Typography;
const PageStat: FC<PropsType> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType,
  } = props;
  const { _id = "" } = useParams(); //重要，在配置路由时配置的是"stat/:_id"，否则下id获取不到
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
  const { loading, data = {} } = useRequest(
    async () => {
      const data = await getQuestionStatListService(_id, {
        //重要，在配置路由时配置的是"stat/:_id"，否则下id获取不到
        page,
        pageSize,
      });

      console.log("id", _id);

      return data;
    },
    {
      refreshDeps: [_id, page, pageSize],
      onSuccess(data) {
        const { list, total } = data;
        setTotal(total);
        setList(list);
      },
    },
  );

  //map遍历出来
  const { componentList } = useGetComponentInfo();
  const tableColumns = componentList.map((c) => {
    return {
      // title: c.props.title || c.title, //优先选props里面的title
      title: (
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedComponentId(c.fe_id);
            setSelectedComponentType(c.type);
          }}
        >
          <span
            style={{
              color: c.fe_id === selectedComponentId ? "#1890ff" : "",
            }}
          >
            {c.props.title || c.title}
          </span>
        </div>
      ),
      dataIndex: c.fe_id,
    };
  });
  const dataSource = list.map((c: any) => ({ ...c, key: c._id }));

  const tableelment = (
    <>
      <Table
        dataSource={dataSource}
        columns={tableColumns}
        pagination={false} //不要自带的分页
      />
      <div style={{ textAlign: "center", marginTop: "18px" }}>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );

  return (
    <div>
      <Title level={3}>答卷总数：{!loading && data.total}</Title>
      <div>
        <div style={{ textAlign: "center" }}>{loading && <Spin />}</div>
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && tableelment}
      </div>
    </div>
  );
};
export default PageStat;
