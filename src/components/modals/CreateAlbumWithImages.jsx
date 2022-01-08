import React, { useRef, useState, useEffect } from "react";
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCreateAlbumWithImages from "../../hooks/useCreateAlbumWithImages";

const CreateAlbumWithImages = ({ show, onHide, imageList }) => {
  const navigate = useNavigate();
  const [updateList, setUpdateList] = useState(null);

  useEffect(() => {
    setUpdateList(
      imageList
        .filter((image) => image.checked === true)
        .map(({ image }) => image)
    );
  }, [imageList]);

  const nameRef = useRef(null);
  const query = useCreateAlbumWithImages();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      query.mutate(nameRef.current.value, updateList);
    } catch (e) {
      console.log(e);
    }
  };

  if (query.isLoading) {
    return (
      <>
        <Spinner animation="border" variant="light" />;
      </>
    );
  }
  if (query.isSuccess) {
    onHide(true);
    navigate("/");
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

export default CreateAlbumWithImages;
