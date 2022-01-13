import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useEditAlbum = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState(null);

  const mutate = async (id, name) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsLoading(true);

    try {
      await updateDoc(doc(db, "albums", id), {
        name,
      });
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return {
    error,
    isError,
    isLoading,
    isSuccess,
    mutate
  };
};

export default useEditAlbum;