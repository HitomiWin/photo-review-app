import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { Alert, ProgressBar } from "react-bootstrap";
import { RingLoader } from "react-spinners";

import useGetAlbum from "../hooks/useGetAlbum";
import useUploadImage from "../hooks/useUploadImage";
import ImageList from "../components/ImageList";

const UploadImagePage = () => {
  const uploadImage = useUploadImage();
  const { id } = useParams();
  const albumQuery = useGetAlbum(id);

  //https://react-dropzone.js.org/
  const onDrop = useCallback(
    (acceptedFiles, e) => {
      if (!acceptedFiles.length) {
        return;
      }
      acceptedFiles.forEach((file) => {
        uploadImage.mutate(file, id);
      });
    },
    [uploadImage, id]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp, image/jpg",
    onDrop,
  });

  if (albumQuery.isLoading) {
    return (
      <div className="center">
        <RingLoader color={"#aa8a0b"} size={50} />
      </div>
    );
  }

  if (!albumQuery.data) {
    return <Alert variant="danger">Sorry, AlbumId :{id} is not found</Alert>;
  }

  return (
    <>
      <h4 className="text-center mt-3">
        Upload Images : {albumQuery.data?.name}{" "}
      </h4>
      <div
        {...getRootProps()}
        id="dropzone-wrapper"
        className={`${isDragAccept ? "drag-accept" : ""}${
          isDragReject ? "drag-reject" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="dropzone-message">
          {isDragActive ? (
            isDragAccept ? (
              <p>Acceptable</p>
            ) : (
              <p>"Error! Files of this type are not accepted"</p>
            )
          ) : (
            <div>
              <FontAwesomeIcon icon={faImages} size="lg" className="mb-2" />
              <p>Drop files here or click to upload.</p>
            </div>
          )}
        </div>
        {uploadImage.progress !== null && (
          <ProgressBar variant="success" animated now={uploadImage.progress} />
        )}

        {uploadImage.isError && (
          <Alert variant="danger">{uploadImage.error}</Alert>
        )}
        {uploadImage.isSuccess && (
          <Alert variant="success">Uploaded the files successflly </Alert>
        )}
      </div>
      <ImageList isUploading={uploadImage.progress} albumId={id} />
    </>
  );
};

export default UploadImagePage;
