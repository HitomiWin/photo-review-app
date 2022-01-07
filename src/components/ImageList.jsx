import React, { useState, useEffect } from "react";
import { Alert, Row, Button } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import ImageCard from "./cards/ImageCard";
import CreateAlbumForm from "./modals/CreateAlbumForm";

const ImageList = ({ albumId }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [createModalShow, setCreateModalShow] = useState(false);
  const query = useGetAllImages(albumId);

  useEffect(() => {
    setHasChecked(checkedList.some((item) => item.checked === true));
  }, [checkedList]);

  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (query.isLoading) {
    return (
      <div className="spinner-wrapper">
        <FadeLoader color={"#aa8a0b"} />
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
            disabled={!hasChecked}
            onClick={() => setCreateModalShow(true)}
          >
            Create New Album
          </Button>
        </div>
        <CreateAlbumForm
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
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
              />
            ))}
          </Row>
        </SRLWrapper>
      </>
    )
  );
};

export default ImageList;
