import React, { useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as thumbUpSolid,
  faThumbsDown as thumbDownSolid,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";

const PreviewCard = ({ image, likeList, setLikeList }) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isDisLiked, setIsDisLiked] = useState(null);

  useEffect(() => {
    setLikeList((state) => [...state, { image, isLiked, isDisLiked }]);
    // eslint-disable-next-line
  }, []);

  const toggleLikeClick = (like) => {
    if (like) {
      setIsLiked(isLiked === null ? true : !isLiked);
      setIsDisLiked(isDisLiked === null ? false : !isDisLiked);
    } else {
      setIsLiked(isLiked === null ? false : !isLiked);
      setIsDisLiked(isDisLiked === null ? true : !isDisLiked);
    }
  };

  useEffect(() => {
    if (likeList.length) {
      let updatedList = likeList.map((item) => {
        if (item.image._id === image._id) {
          return { ...item, isLiked: isLiked, isDisLiked: isDisLiked };
        }
        return item;
      });

      setLikeList(() => updatedList);
    }
    // eslint-disable-next-line
  }, [isLiked]);

  return (
    <>
      <Col sm={12} md={4} lg={3} className="my-3">
        <Card>
          <Card.Header>
            <div className="card-actions text-end">
              <Button variant="info" onClick={() => toggleLikeClick(true)}>
                <FontAwesomeIcon
                  icon={thumbUpSolid}
                  color={
                    isLiked === null // choosen neither like or not
                      ? "#d8d0cf" //gray
                      : isLiked === false // choosen dislike
                      ? "#d8d0cf" //gray
                      : "#aa8a0b" // choosen like //yellow
                  }
                  size="lg"
                />
              </Button>
              <Button variant="info" onClick={() => toggleLikeClick(false)}>
                <FontAwesomeIcon
                  icon={thumbDownSolid}
                  color={
                    isDisLiked === null // choosen neither like or not
                      ? "#d8d0cf"
                      : isDisLiked === false // choosen like
                      ? "#d8d0cf"
                      : "#aa8a0b" // choosen dislike
                  }
                  size="lg"
                />
              </Button>
            </div>
          </Card.Header>
          <div className="image-box">
            <span
              className={`dislike-box ${
                isDisLiked === null
                  ? "like"
                  : isDisLiked === false
                  ? "like"
                  : "dislike"
              }`}
            >
              <FontAwesomeIcon icon={faFrown} />
            </span>
            <a href={image.url}>
              <Card.Img
                className="image-card"
                variant="top"
                src={image.url}
                title={image._id}
              />
            </a>
          </div>
        </Card>
      </Col>
    </>
  );
};

export default PreviewCard;
