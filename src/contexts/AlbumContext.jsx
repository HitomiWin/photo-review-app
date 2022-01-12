import React, { createContext, useContext, useState } from "react";

const AlbumContext = createContext();

const useAlbumContext = () => {
  return useContext(AlbumContext);
};

const AlbumContextProvider = ({ children }) => {
  const [albumId, setAlbumId] = useState(null);

  const values = {
    albumId,
    setAlbumId,
  };

  return (
    <AlbumContext.Provider value={values}>{children}</AlbumContext.Provider>
  );
};

export { useAlbumContext, AlbumContextProvider as default };
