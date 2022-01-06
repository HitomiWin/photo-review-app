import React from "react";
import {  Alert, Row} from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import useGetAllImages from "../hooks/useGetAllImages";
import { SRLWrapper } from 'simple-react-lightbox'
import ImageCard from "./cards/ImageCard"

const ImageList = ({albumId}) => {
  const query  = useGetAllImages(albumId)

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
      <h4 className="text-center color-yellow my-3">My Photos</h4>
      <SRLWrapper>
      <Row className="justify-content-center">
     
        {query.data.map(image=>(
          <ImageCard key={image._id} albumId={albumId} image={image}/>
        ))}
      </Row>
      </SRLWrapper>

    </>
  );
};

export default ImageList;