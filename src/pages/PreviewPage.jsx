import React from "react";
import { useParams } from "react-router-dom";

import PreviewImageList from "../components/PreviewImageList";

const PreviewPage = () => {
  const { id } = useParams();
  const albumId = id.slice(-36);
  console.log(albumId);

  return <PreviewImageList albumId={albumId} />;
};

export default PreviewPage;
