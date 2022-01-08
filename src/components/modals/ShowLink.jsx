import React from "react";
import { Modal, Button } from "react-bootstrap";
const ShowLink = ({ url, show, onHide }) => {
  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <h4 className="text-center mt-3 color-blue ">Link</h4>
        <p className="text-center mt-3 color-blue ">
          Please copy the link and send your cuntomer to get reviews
        </p>
        <Modal.Body>
          <p className="text-center mt-3 color-blue ">{url}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide(true)} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowLink;
