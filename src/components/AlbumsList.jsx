import React, { useState } from "react";
import { Button, Alert, Row, Spinner } from "react-bootstrap";
import CreateAlbumModal from "./modals/CreateAlbumModal";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import AlbumCard from "./cards/AlbumCard";
import { v4 as uuidv4 } from "uuid";

const AlbumsList = () => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const uuid = uuidv4();

  const query = useGetAllAlbums("albums");

  return (
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
      {query.isError && <Alert variant="danger">{query.error}</Alert>}
      {query.isLoading && (
        <div className="spinner-wrapper">
          <Spinner animation="border" variant="light" />;
        </div>
      )}
      <Row className="justify-content-center">
        {!query.isLoading &&
          !query.isError &&
          query.data.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
      </Row>
    </>
  );
};

export default AlbumsList;
