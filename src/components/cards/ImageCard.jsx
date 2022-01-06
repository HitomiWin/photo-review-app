import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import useDeleteImage from "../../hooks/useDeleteImage";

const ImageCard = ({ albumId, image }) => {
  const deleteImage = useDeleteImage(image);
  const handleDeleteImageClick = (e) => {
    e.stopPropagation()
    deleteImage.mutate(albumId, image._id);
  };

  return (
    <>


    <Col sm={12}md={4}lg={3} className ="my-3">
      <Card
        className={`image-card ${deleteImage.isMutating ? "mutating" : ""}`}
      >
        <Card.Header>
          <span className="image-filename" title={image.name}>
            {image.name}
          </span>
          <div className="card-actions">
            <Button
              variant="info"
              size="sm"
              disabled={deleteImage.isMutating}
              onClick={handleDeleteImageClick}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
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

export default ImageCard;
