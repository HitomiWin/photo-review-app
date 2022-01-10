import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import useDeleteAlbum from "../../hooks/useDeleteAlbum";
import EditAlbumName from "../modals/EditAlbumName";
import ShowLink from "../modals/ShowLink";

const AlbumCard = ({ album }) => {
  const [linkModalShow, setLinkModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const deleteAlbum = useDeleteAlbum(album);
  const navigate = useNavigate();
  const handleDeleteAlbumClick = async (e) => {
    e.stopPropagation();
    await deleteAlbum.mutate(album);
  };

  const url = `https://brave-knuth-ae749f.netlify.app/preview/${album.linkId}${album._id}`;

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

      <Col sm={12} md={4} lg={3} className="my-3">
        <Card
          className={`album-card ${deleteAlbum.isMutating ? "mutating" : ""}`}
        >
          <Card.Header>
            <span className="album-filename" title={album.name}>
              {album.name}
            </span>
            <div className="card-actions">
              <Button
                variant="info"
                size="lg"
                disabled={deleteAlbum.isMutating}
                onClick={handleDeleteAlbumClick}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
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
            <Button onClick={() => navigate(`upload-image/${album._id}`)}>
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

          {/* <a href={album.url}>
        <Card.Img variant="top" src={album.url} title={album._id} />
      </a> */}
        </Card>
      </Col>
    </>
  );
};

export default AlbumCard;
