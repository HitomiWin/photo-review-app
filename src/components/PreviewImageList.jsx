import React, { useState, useEffect } from "react";
import { Alert, Row, Button, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import PreviewCard from "./cards/PreviewCard";
import CreateAlbumWithImages from "./modals/CreateAlbumWithImages";

const PreviewImageList = ({ albumId }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const query = useGetAllImages(albumId);

  useEffect(() => {
    console.log(checkedList);
    setIsAllChecked(
      checkedList.some(
        (item) => item.isLiked === null || item.isDisLiked === null
      )
    );
  }, [checkedList]);
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

  return (
    query.data && (
      <>
        <h4 className="text-center color-yellow my-">My Photos</h4>
        <div className="d-flex justify-content-end align-item-center">
          <Button
            variant="light"
            disabled={!isAllChecked}
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
                <PreviewCard
                  key={image._id}
                  albumId={albumId}
                  image={image}
                  checkedList={checkedList}
                  setCheckedList={setCheckedList}
                />
              ))}
            </Row>
          </SRLWrapper>
        )}
      </>
    )
  );
};

export default PreviewImageList;
