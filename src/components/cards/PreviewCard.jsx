import React, { useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as thumbUpSolid,
  faThumbsDown as thumbDownSolid,
} from "@fortawesome/free-solid-svg-icons";
// import {
//   faThumbsUp as thumbUpRegular,
//   faThumbsDown as thumbDownRegular,
// } from "@fortawesome/free-regular-svg-icons";

const PreviewCard = ({ image, likeList, setLikeList }) => {
  const [isLiked, setIsLiked] = useState("1");
  const [isDisLiked, setIsDisLiked] = useState("1");

  useEffect(() => {
    console.log(likeList);
    setLikeList((state) => [...state, { image, checked: "1" }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   toggleChecked();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLiked]);

  useEffect(() => {
    console.log(likeList);
    let updatedList = likeList.map((item) => {
      if (item.image._id === image._id) {
        return { ...item, isLiked, isDisLiked };
      }
      return item;
    });

    setLikeList(updatedList);
  }, [isLiked, isDisLiked]);

  // const toggleChecked = () => {
  //   console.log(likeList);
  //   // to change buttons color
  //   let updatedList = likeList.map((item) => {
  //     if (item.image._id === image._id) {
  //       return { ...item, isLiked, isDisLiked };
  //     }
  //     return item;
  //   });

  //   setLikeList(updatedList);
  // };

  return (
    <>
      <Col sm={12} md={4} lg={3} className="my-3">
        <Card
        // className={`image-card ${deleteImage.isMutating ? "mutating" : ""}`}
        >
          <Card.Header>
            <span title={image.name}>{image.name}</span>
            <div className="card-actions text-end">
              <Button
                variant="info"
                onClick={() => {
                  setIsLiked(isLiked === "1" ? true : !isLiked);
                  setIsDisLiked(isDisLiked === "1" ? false : !isDisLiked);
                }}
              >
                <FontAwesomeIcon
                  icon={thumbUpSolid}
                  color={
                    isLiked === "1" // choosen neither like or not
                      ? "#d8d0cf"
                      : isLiked === false // choosen dislike
                      ? "#d8d0cf"
                      : "#aa8a0b" // choosen like
                  }
                  size="lg"
                />
              </Button>
              <Button
                variant="info"
                onClick={() => {
                  setIsLiked(isLiked === "1" ? false : !isLiked);
                  setIsDisLiked(isDisLiked === "1" ? true : !isDisLiked);
                }}
              >
                <FontAwesomeIcon
                  icon={thumbDownSolid}
                  color={
                    isDisLiked === "1" // choosen neither like or not
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
          <a href={image.url}>
            <Card.Img variant="top" src={image.url} title={image._id} />
          </a>
        </Card>
      </Col>
    </>
  );
};

export default PreviewCard;
