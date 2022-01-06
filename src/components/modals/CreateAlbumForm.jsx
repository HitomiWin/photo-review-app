import React, { useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from "react-spinners";
import useCreateAlbum from "../../hooks/useCreateAlbum";

const CreateAlbumForm = ({show, onHide}) => {
  const navigate = useNavigate();
  const nameRef = useRef(null)
  const query = useCreateAlbum();

  const handleSubmit = (e)=>{
    e.preventDefault()
    try{
      query.mutate(nameRef.current.value)
      onHide(true)
    }catch(e){
      console.log(e)
    }
  }
  
  if (query.isLoading){

    return (
    <FadeLoader  color={"#aa8a0b"} height={15} width={5} radius={2} margin={2}/>
    )
  }

  return (
    <>
      <Modal 
        show={show} 
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title className="text-center">Give your album a name</Modal.Title>
        </Modal.Header>
        {query.isError && <Alert>{query.error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control type="text" placeholder="Give your album a name"  ref={nameRef} required />
          </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" >
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAlbumForm;
