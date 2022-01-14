import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditAlbumName from "../modals/EditAlbumName";
import ShowLink from "../modals/ShowLink";

const AlbumCard = ({ album }) => {
  const [linkModalShow, setLinkModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  //this is url to send to customer to get reviews
  const url = `https://hitomi-photographer.netlify.app/preview/${album.linkId}${album._id}`;

  return (
    <>
      <EditAlbumName
        album={album}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ShowLink
        url={url}
        show={linkModalShow}
        onHide={() => setLinkModalShow(false)}
      />

      <Col sm={10} md={4} lg={3} className="my-3 ml-auto">
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <span className="album-filename" title={album.name}>
              {album.name}
            </span>
            <div className="card-actions">
              <Button
                variant="info"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="d-flex justify-content-between">
            <Button
              onClick={() =>
                navigate(`upload-image/${album._id}`, { state: `${album._id}` })
              }
            >
              Upload
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setLinkModalShow(true);
              }}
            >
              Link
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default AlbumCard;
