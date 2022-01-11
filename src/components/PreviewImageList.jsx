import React, { useState, useEffect } from "react";
import { Alert, Row, Button, Spinner } from "react-bootstrap";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import PreviewCard from "./cards/PreviewCard";
import useCreateAlbumWithImages from "../hooks/useCreateAlbumWithImages";
import useGetAlbum from "../hooks/useGetAlbum";

const PreviewImageList = ({ albumId }) => {
  const [likeList, setLikeList] = useState([]);
  const [hasNull, setHasNull] = useState(true);
  const [likeAmount, setLikeAmount] = useState(0);
  const query = useGetAllImages(albumId, "albums");
  const { data: album } = useGetAlbum(albumId);
  const submitQuery = useCreateAlbumWithImages();

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

  let updateList = likeList
    .filter((image) => image.isLiked)
    .map(({ image }) => image);

  const handleSubmit = async (e) => {
    const col = "review-albums";
    e.preventDefault();
    try {
      await submitQuery.mutate(album, updateList, col);
    } catch (e) {
      console.log(e);
    }
  };

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
    return (
      <p className="text-center">
        Sorry, There are no photos, Please contact your photographer
      </p>
    );
  }

  return (
    query.data && (
      <div className="preview-container">
        {submitQuery.isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        )}

        {submitQuery.isError && (
          <div className="text-center">
            <Alert variant="danger">{submitQuery.error}</Alert>
          </div>
        )}
        {submitQuery.isSuccess && (
          <div className="text-center">
            <h4>Thank you for submitting!</h4>
          </div>
        )}

        <h4 className="text-center color-yellow mt-3">Photo Gallery</h4>
        <div className="d-flex justify-content-end align-item-center mt-5">
          <div className="mx-5">
            <h5>
              {likeAmount}/{likeList.length} photos as{" "}
              <FontAwesomeIcon icon={faThumbsUp} color={"#aa8a0b"} />
            </h5>
          </div>
          <Button variant="light" disabled={hasNull} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
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
      </div>
    )
  );
};

export default PreviewImageList;
