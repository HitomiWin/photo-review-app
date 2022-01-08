import React, { useRef } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import useCreateAlbum from "../../hooks/useCreateAlbum";
import { useNavigate } from "react-router-dom";

const CreateAlbumForm = ({ show, onHide, uuid }) => {
  const nameRef = useRef(null);
  const query = useCreateAlbum();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      query.mutate(nameRef.current.value, uuid);
      navigate(`/upload-image/${uuid}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (query.isLoading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="light" />;
      </div>
    );
  }

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h4 className="text-center mt-3 color-blue ">Give your album a name</h4>
        {query.isError && <Alert>{query.error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-3">
            <Form.Control
              type="text"
              placeholder="name"
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

export default CreateAlbumForm;
