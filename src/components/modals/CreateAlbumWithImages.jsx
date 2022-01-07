import React, { useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import useCreateAlbumWithImages from "../../hooks/useCreateAlbumWithImages";

const CreateAlbumWithImages = ({ show, onHide, imageList }) => {
  const navigate = useNavigate();
  let updateList = imageList
    .filter((image) => image.checked === true)
    .map(({ image }) => image);
  const nameRef = useRef(null);
  const query = useCreateAlbumWithImages();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      query.mutate(nameRef.current.value, updateList);
      onHide(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (query.isLoading) {
    return (
      <FadeLoader
        color={"#aa8a0b"}
        height={15}
        width={5}
        radius={2}
        margin={2}
      />
    );
  }
  if (query.isSuccess) {
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
