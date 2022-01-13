import React, { useState } from "react";
import { Button, Alert, Row, Spinner } from "react-bootstrap";
import CreateAlbumModal from "./modals/CreateAlbumModal";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import AlbumCard from "./cards/AlbumCard";
import { v4 as uuidv4 } from "uuid";

const AlbumList = () => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const uuid = uuidv4();
  const query = useGetAllAlbums("albums");

  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (query.isLoading) {
    return (
      <div className="center">
        <Spinner animation="border" variant="light" />;
      </div>
    );
  }

  return (
    query.data && (
      <>
        <h4 className="text-center color-yellow my-3">My Albums</h4>
        <div className="text-center">
          <Button
            variant="primary"
            className="text-button  text-center my-3"
            onClick={() => setCreateModalShow(true)}
          >
            Create an Album ?
          </Button>
        </div>
        <CreateAlbumModal
          show={createModalShow}
          onHide={() => setCreateModalShow(false)}
          uuid={uuid}
        />
        <Row className="justify-content-center">
          {query.data.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </Row>
      </>
    )
  );
};

export default AlbumList;
