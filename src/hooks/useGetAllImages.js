import {
  useFirestoreQueryData
} from "@react-query-firebase/firestore";
import {
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import {
  db
} from "../firebase";
import {
  useAuthContext
} from "../contexts/AuthContext";

const useGetAllImages = (id, col) => {
  const {
    currentUser
  } = useAuthContext();
  const imagesRef = collection(db, col, id, "images");
  const queryKey = ["images", id];
  const queryRef =
    query(
      imagesRef,
      orderBy("created", 'desc')
    )

  const getImagesQuery = useFirestoreQueryData(
    queryKey,
    queryRef, {
      idField: "_id",
      subscribe: true,
    },
  );

  return getImagesQuery;
};

export default useGetAllImages;