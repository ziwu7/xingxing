import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import {
  LIST_PAGE_PARM_KEY,
  LIST_PAGE_SIZE_PARM_KEY,
  LIST_PAGE_SIZE,
} from "../constant";
type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  const [serachParms] = useSearchParams();
  useEffect(() => {
    const page = parseInt(serachParms.get(LIST_PAGE_PARM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(serachParms.get(LIST_PAGE_SIZE_PARM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [serachParms]);

  //当page和pageSize改变时跳转页面（即修改url参数
  const nav = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  function handleChange(page: number, pageSize: number) {
    // console.log("change", page, pageSize);

    serachParms.set(LIST_PAGE_PARM_KEY, page.toString());
    serachParms.set(LIST_PAGE_SIZE_PARM_KEY, pageSize.toString());
    nav({
      pathname,
      search: serachParms.toString(), //除了page和pagesize之外，其他url参数是带着的，如keyword
    });
  }
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handleChange}
    />
  );
};
export default ListPage;
