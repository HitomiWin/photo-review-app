import React, { useState } from "react";
import { Alert, Row, Button, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ImageCard from "./cards/ImageCard";
import CreateAlbumWithImages from "./modals/CreateAlbumWithImages";

const ImageList = ({ isUploading, albumId }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [createModalShow, setCreateModalShow] = useState(false);
  const query = useGetAllImages(albumId, "albums");
  // to stop to click checkbox during upploading doesn't show imagelist
  if (isUploading) {
    return (
      <div className="spinner-wrapper">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (query.isLoading) {
    return (
      <div className="spinner-wrapper">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!query.data.length) {
    return <p className="text-center">Please upload some photos</p>;
  }
  const hasChecked = checkedList.some((item) => item.checked === true);

  return (
    query.data && (
      <>
        <h4 className="text-center color-yellow my-">My Photos</h4>
        <div className="d-flex justify-content-end align-item-center">
          <Button
            variant="light"
            disabled={!hasChecked || isUploading}
            onClick={() => setCreateModalShow(true)}
          >
            Create New Album
          </Button>
        </div>
        <CreateAlbumWithImages
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
          imageList={checkedList}
        />
        <SRLWrapper>
          <Row className="justify-content-center">
            {query.data.map((image) => (
              <ImageCard
                key={image._id}
                albumId={albumId}
                image={image}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                isUploading={isUploading}
              />
            ))}
          </Row>
        </SRLWrapper>
      </>
    )
  );
};

export default ImageList;
