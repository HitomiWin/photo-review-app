import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import useUploadImage from "../hooks/useUploadImage";

const UploadImagePage = () => {
  const uploadImage = useUploadImage();

  //https://react-dropzone.js.org/
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!acceptedFiles.length) {
        return;
      }
      acceptedFiles.forEach((file) => {
        uploadImage.mutate(file);
      });
    },
    [uploadImage]
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

  return (
    <>

      <h4 className="text-center">Upload Images</h4>
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
      </div>
    </>
  );
};

export default UploadImagePage;
