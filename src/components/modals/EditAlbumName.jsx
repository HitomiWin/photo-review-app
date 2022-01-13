import React, { useRef } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import useEditAlbum from "../../hooks/useEditAlbum";

const EditAlbumName = ({ album, show, onHide }) => {
  const nameRef = useRef(null);
  const query = useEditAlbum();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await query.mutate(album._id, nameRef.current.value);
      onHide(true);
    } catch (e) {
      console.log(e);
    }
  };
  if (query.isError) {
    return <Alert variant="danger">{query.error}</Alert>;
  }

  if (query.isLoading) {
    return (
      <>
        <Spinner animation="border" variant="light" />;
      </>
    );
  }

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h4 className="text-center mt-3 color-blue ">Edit name ? </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-3">
            <Form.Control
              type="text"
              placeholder="name"
              defaultValue={album.name}
              ref={nameRef}
              required
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => onHide(true)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditAlbumName;
