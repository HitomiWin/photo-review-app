import React, { useState, useEffect } from "react";
import { Alert, Row, Button, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "./cards/PreviewCard";
import CreateAlbumWithImages from "./modals/CreateAlbumWithImages";

const PreviewImageList = ({ albumId }) => {
  const [likeList, setLikeList] = useState([]);
  const [hasNull, setHasNull] = useState(true);
  const [createModalShow, setCreateModalShow] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);
  const query = useGetAllImages(albumId);

  useEffect(() => {
    setHasNull(
      likeList.some(
        (item) => (item.isLiked === null) | (item.isDisLiked === null)
      )
    );
    let i = 0;
    likeList.forEach((like) => {
      if (like.isLiked) {
        i = i + 1;
      }
    });
    setLikeAmount(i);
  }, [likeList]);
  console.log(likeAmount);
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
        <h4 className="text-center color-yellow mt-3">Photo Gallery</h4>
        <div className="d-flex justify-content-end align-item-center mt-5">
          <div className="mx-5">
            <h5>
              {likeAmount}/{likeList.length} photos as{" "}
              <FontAwesomeIcon icon={faThumbsUp} color={"#aa8a0b"} />
            </h5>
          </div>
          <Button
            variant="light"
            disabled={hasNull}
            onClick={() => setCreateModalShow(true)}
          >
            Submit
          </Button>
        </div>
        <CreateAlbumWithImages
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
          imageList={likeList}
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
                  image={image}
                  likeList={likeList}
                  setLikeList={setLikeList}
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
