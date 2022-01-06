import React,{useState, useEffect}from "react";
import {  Alert, Row , Button } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from 'simple-react-lightbox'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import {faCheckSquare as noCheckedBox } from "@fortawesome/free-regular-svg-icons";
import ImageCard from "./cards/ImageCard"

const ImageList = ({albumId}) => {
  const [checkedList, setCheckedList] = useState([])
  const query  = useGetAllImages(albumId)

  useEffect(()=>{
    console.log(checkedList)
  },[checkedList])
  if(query.isError){
   return  <Alert variant="danger">{query.error}</Alert>
  }

  if(query.isLoading){
    return (
    <div className="spinner-wrapper">
      <FadeLoader  color={"#aa8a0b"}/>
    </div>
    )
  }
  if(!query.data.length){
    return  <p className="text-center">Please upload some photos</p>
  }

  return query.data && (
    <>
      <h4 className="text-center color-yellow my-">My Photos</h4>
      <div className="d-flex justify-content-end align-item-center">
        {/* <span className="mx-3">{<FontAwesomeIcon icon={ faCheckSquare } color="#aa8a0b"/>: <FontAwesomeIcon icon={ faCheckSquare } color="gray"/>}</span> */}
        <Button variant="light"  >Create New Album</Button>

      </div>
      <SRLWrapper>
      <Row className="justify-content-center">
     
        {query.data.map(image=>(
          <ImageCard key={image._id} albumId={albumId} image={image} checkedList={checkedList} setCheckedList={setCheckedList} />
        ))}
      </Row>
      </SRLWrapper>

    </>
  );
};

export default ImageList;