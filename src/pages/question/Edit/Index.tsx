import React, { FC } from "react";
// import { useParams } from "react-router-dom";
// import { getQuestionService } from "../../../services/question";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./Index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import LeftPanel from "../Edit/LeftPanel";
import RightPanel from "./RightPanel";
const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData();
  // const { _id = "" } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(_id);
  //   }
  //   fn();
  // }, []);
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }
  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: "#fff", height: "40px" }}>header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <div style={{ height: "900px" }}>
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
      {/* {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>} */}
    </div>
  );
};

export default Edit;
