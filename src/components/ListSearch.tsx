import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARM_KEY } from "../constant";
const { Search } = Input;

const ListSearch: FC = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const [searchParam] = useSearchParams();
  const { pathname } = useLocation();
  useEffect(() => {
    const curVal = searchParam.get(LIST_SEARCH_PARM_KEY) || "";
    setValue(curVal);
    //searchParam变化时都会执行
  }, [searchParam]);
  function handleValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function handleSearch(value: string) {
    console.log(value);

    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARM_KEY}=${value}`,
    });
  }
  return (
    <div>
      <Search
        allowClear
        placeholder="请输入关键词哇！"
        value={value}
        onChange={handleValue}
        onSearch={handleSearch}
        style={{ width: "260px" }}
      />
    </div>
  );
};

export default ListSearch;
