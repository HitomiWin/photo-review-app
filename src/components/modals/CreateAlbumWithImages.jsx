import React, { useRef } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCreateAlbumWithImages from "../../hooks/useCreateAlbumWithImages";

const CreateAlbumWithImages = ({ show, onHide, imageList }) => {
  const navigate = useNavigate();
  const updateList = imageList
    .filter((image) => image.checked)
    .map(({ image }) => image);

  const nameRef = useRef(null);
  const query = useCreateAlbumWithImages();
  const handleSubmit = async (e) => {
    const col = "albums";
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      await query.mutate({ name, updateList, col });
      onHide(true);
      navigate("/");
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
        <h4 className="text-center mt-3 color-blue ">Name</h4>
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

export default CreateAlbumWithImages;
