import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import { Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import useDeleteAlbum from "../../hooks/useDeleteAlbum";
import EditAlbumName from "../modals/EditAlbumName";

const AlbumCard = ({ album }) => {
  const [modalShow, setModalShow] = useState(false);
  const deleteAlbum = useDeleteAlbum(album);
  const navigate = useNavigate()
  const handleDeleteAlbumClick = (e) => {
    e.stopPropagation()
    deleteAlbum.mutate(album);
  };

  return (
    <>
    <EditAlbumName  album={album}show={modalShow} onHide={() => setModalShow(false)}/>
  
    <Col sm={12}md={4}lg={3} className ="my-3">
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
              size="sm"
              disabled={deleteAlbum.isMutating}
              onClick={handleDeleteAlbumClick}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Button
              variant="info"
              size="sm"
              onClick={(e)=>{e.stopPropagation(); setModalShow(true)}}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between">
          <Button onClick={()=>navigate(`upload-image/${album._id}`)}>Upload</Button>
          <Button>Link</Button>
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
