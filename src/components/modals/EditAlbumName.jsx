import React, { useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import useEditAlbum from "../../hooks/useEditAlbum";

const EditAlbumName = ({album, show, onHide,}) => {
  const nameRef = useRef(null)
  const editQuery = useEditAlbum();

  const handleSubmit = (e)=>{
    e.preventDefault()
    try{
      editQuery.mutate(album._id, nameRef.current.value)
      onHide(true)
    }catch(e){
      console.log(e)
    }
  }
  
  if (editQuery.isLoading){

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
          <h4 className="text-center mt-3 color-blue ">Edit name ? </h4>
        {editQuery.isError && <Alert>{editQuery.error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-3">
            <Form.Control type="text" placeholder="name" defaultValue={album.name} ref={nameRef} required />
          </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide(true)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" >
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditAlbumName;
