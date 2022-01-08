import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { firebaseTimestampToString } from "../../helpers/time";

const ReviewAlbumCard = ({ album }) => {
  const navigate = useNavigate();
  return (
    <>
      <Col sm={12} md={4} lg={3} className="my-3">
        <Card
          onClick={() => {
            navigate(`/review-album/${album._id}`);
          }}
        >
          <Card.Header>
            <span className="album-filename" title={album.name}>
              {album.name}
            </span>
          </Card.Header>
          <Card.Body className="d-flex justify-content-between">
            {firebaseTimestampToString(album.created)}
          </Card.Body>

          {/* <a href={album.url}>
        <Card.Img variant="top" src={album.url} title={album._id} />
      </a> */}
        </Card>
      </Col>
    </>
  );
};

export default ReviewAlbumCard;
