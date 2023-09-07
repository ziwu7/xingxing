import React, { FC } from "react";
// import { useParams } from "react-router-dom";
// import { getQuestionService } from "../../../services/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();
  // const { _id = "" } = useParams();
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(_id);
  //   }
  //   fn();
  // }, []);

  return (
    <div>
      <p>edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Edit;
