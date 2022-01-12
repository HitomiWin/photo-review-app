import React, { useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare as noCheckedBox } from "@fortawesome/free-regular-svg-icons";
import useDeleteImage from "../../hooks/useDeleteImage";

const ImageCard = ({
  albumId,
  image,
  checkedList,
  setCheckedList,
  isUploading,
  isDataLoading,
}) => {
  const [checked, setChecked] = useState(false);
  const deleteImage = useDeleteImage(image);
  const handleDeleteImageClick = async (e) => {
    e.stopPropagation();
    await deleteImage.mutate(albumId, image._id);
  };

  useEffect(() => {
    setCheckedList((state) => [...state, { image, checked: false }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleChecked = () => {
    setChecked(!checked); // to change buttons color
    let updatedList = checkedList.map((item) => {
      if (item.image._id === image._id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setCheckedList(updatedList);
  };

  return (
    <>
      <Col sm={12} md={4} lg={3} className="my-3">
        <Card>
          <Card.Header>
            <div className="card-actions">
              <Button
                variant="info"
                onClick={toggleChecked}
                disable={isUploading || isDataLoading}
              >
                {checked ? (
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    color="#aa8a0b"
                    size="lg"
                  />
                ) : (
                  <FontAwesomeIcon icon={noCheckedBox} size="lg" />
                )}
              </Button>
              <Button
                variant="info"
                size="sm"
                disabled={deleteImage.isMutating}
                onClick={handleDeleteImageClick}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              </Button>
            </div>
          </Card.Header>
          <a href={image.url}>
            <Card.Img
              className="image-card"
              variant="top"
              src={image.url}
              title={image._id}
            />
          </a>
        </Card>
      </Col>
    </>
  );
};

export default ImageCard;
