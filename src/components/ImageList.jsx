import React, { useState, useEffect } from "react";
import { Alert, Row, Button, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ImageCard from "./cards/ImageCard";
import CreateAlbumWithImages from "./modals/CreateAlbumWithImages";

const ImageList = ({ isUploading, albumId }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const query = useGetAllImages(albumId, "albums");

  useEffect(() => {
    setHasChecked(checkedList.some((item) => item.checked === true));
  }, [checkedList]);
  
  if (query.isLoading) {
    return (
      <div className="spinner-wrapper">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (!query.data.length) {
    return <p className="text-center">Please upload some photos</p>;
  }

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
        {query.isLoading ? (
          <div className="spinner-wrapper">
            <Spinner animation="border" variant="light" />;
          </div>
        ) : (
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
        )}
      </>
    )
  );
};

export default ImageList;
