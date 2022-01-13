import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { firebaseTimestampToString } from "../../helpers/time";

const ReviewAlbumCard = ({ album }) => {
  const navigate = useNavigate();
  return (
    <>
      <Col sm={12} md={4} lg={3} className="my-3 review-album-card">
        <Card
          onClick={() => {
            navigate(`/review-album/${album._id}`, {
              state: { albumId: `${album._id}` },
            });
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
        </Card>
      </Col>
    </>
  );
};

export default ReviewAlbumCard;
