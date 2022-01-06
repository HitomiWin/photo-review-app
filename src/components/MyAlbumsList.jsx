import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CreateAlbumForm from "./modals/CreateAlbumForm";

const MyAlbumsList = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <h4 className="text-center color-yellow my-3">My Albums</h4>
      <div className="text-center">
      <Button variant="primary"  onClick={() => setModalShow(true)} >
        Create an Album ?
      </Button>

      </div>


      <CreateAlbumForm show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default MyAlbumsList;
