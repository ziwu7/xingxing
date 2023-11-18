import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { _id = "" } = useParams();
  console.log("id", _id);

  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});

  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(_id);
  //       setQuestionData(data);
  //       setLoading(false);
  //     }
  //     fn();
  //   }, []);
  async function load(id: string) {
    const data = await getQuestionService(_id);
    return data;
  }
  const { loading, data, error } = useRequest(load);
  return { loading, data, error };
}
export default useLoadQuestionData;
