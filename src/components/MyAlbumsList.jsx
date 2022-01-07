import React, { useState } from "react";
import { Button, Alert, Row } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import CreateAlbumForm from "./modals/CreateAlbumForm";
import useGetAllAlbums from "../hooks/useGetAllAlbums";
import AlbumCard from "./cards/AlbumCard";

const MyAlbumsList = () => {
  const [createModalShow, setCreateModalShow] = useState(false);

  const query = useGetAllAlbums();

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
      <CreateAlbumForm
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      {query.isError && <Alert variant="danger">{query.error}</Alert>}
      {query.isLoading && (
        <div className="spinner-wrapper">
          <FadeLoader color={"#aa8a0b"} />
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

export default MyAlbumsList;
