import React, { FC } from "react";
import { useParams } from "react-router-dom";
const Edit: FC = () => {
  const { _id = "" } = useParams();
  return <p>Edit{_id}</p>;
};

export default Edit;
